import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import {
  endOfDay,
  endOfMonth,
  endOfToday,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, text: string) {
    const task = await this.prisma.task.create({
      data: {
        text,
        userId,
        dateSent: new Date(),
      },
    });

    return task;
  }

  async findById(id: string) {
    const task = await this.prisma.task.findUnique({ where: { id } });

    return task;
  }

  async markAsDone(taskShortId: number) {
    return this.prisma.task.update({
      where: { shortId: taskShortId },
      data: { status: TaskStatus.COMPLETED },
    });
  }

  async countAllByUser(userId: string) {
    return this.prisma.task.count({ where: { userId } });
  }

  async countDoneByUser(userId: string) {
    return this.prisma.task.count({
      where: { userId, status: TaskStatus.COMPLETED },
    });
  }

  async countDoneInPeriod(userId: string, from: Date, to: Date) {
    return this.prisma.task.count({
      where: {
        userId,
        status: TaskStatus.COMPLETED,
        dateSent: { gte: from, lte: to },
      },
    });
  }

  async getProgress(userId: string) {
    const now = new Date();

    const [all, done, doneToday, doneWeek, doneMonth] = await Promise.all([
      this.countAllByUser(userId),
      this.countDoneByUser(userId),
      this.countDoneInPeriod(userId, startOfToday(), endOfToday()),
      this.countDoneInPeriod(userId, startOfWeek(now), endOfWeek(now)),
      this.countDoneInPeriod(userId, startOfMonth(now), endOfMonth(now)),
    ]);

    return { all, done, doneToday, doneWeek, doneMonth };
  }

  async getTodayTask(userId: string) {
    const today = new Date();
    const start = startOfDay(today);
    const end = endOfDay(today);

    const task = await this.prisma.task.findFirst({
      where: {
        userId,
        dateSent: { gte: start, lte: end },
      },
    });

    if (!task) {
      throw new NotFoundException('Not found today task');
    }

    return task;
  }

  async getAllTasks(userId: string) {
    return this.prisma.task.findMany({
      where: { userId },
      orderBy: { dateSent: 'desc' },
    });
  }

  async completeTask(userId: string, taskId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id: taskId, userId },
    });

    if (!task) throw new NotFoundException('Task not found');

    return this.prisma.task.update({
      where: { id: task.id },
      data: { status: 'COMPLETED' },
    });
  }
}
