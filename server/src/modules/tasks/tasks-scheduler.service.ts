import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { UsersService } from '../users/users.service';
import { TasksService } from '../tasks/tasks.service';
import { TelegramService } from '../telegram/telegram.service';
import { ExercisesService } from '../exercises/exercises.service';

@Injectable()
export class TasksSchedulerService {
  constructor(
    private usersService: UsersService,
    private tasksService: TasksService,
    private exercisesService: ExercisesService,
    private telegramService: TelegramService,
  ) {}

  // @Cron('*/1 * * * *')
  @Cron('0 9 * * *')
  async sendDailyTasks() {
    const users = await this.usersService.getAllWithUserRole();

    for (const user of users) {
      const exercise = await this.exercisesService.getRandom();
      const task = await this.tasksService.create(user.id, exercise.text);
      if (user.telegramId) {
        await this.telegramService.sendMessage(
          user.telegramId,
          `Ваше задание на сегодня: ${task.text}\nНомер задания: ${task.shortId}`,
        );
      }
    }
  }
}
