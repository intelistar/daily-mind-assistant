import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('today')
  async getToday(@CurrentUser() user: User) {
    const userId = user.id;
    const task = await this.tasksService.getTodayTask(userId);
    return task;
  }

  @Get()
  async getAll(@CurrentUser() user: User) {
    const userId = user.id;
    const tasks = await this.tasksService.getAllTasks(userId);
    return tasks;
  }

  @Post('complete/:id')
  async complete(@CurrentUser() user: User, @Param('id') id: string) {
    const userId = user.id;
    const task = await this.tasksService.completeTask(userId, id);
    return task;
  }
}
