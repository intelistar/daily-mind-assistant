import { Injectable } from '@nestjs/common';
import { SessionContext } from '../telegram.context';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class DoneHandler {
  constructor(private readonly tasksService: TasksService) {}

  async handle(ctx: SessionContext, text: string) {
    const parts = text.split(' ');
    const taskId = parts[1];
    if (!taskId) {
      await ctx.reply(MESSAGES.doneMissingId);
      return;
    }

    const task = await this.tasksService.markAsDone(Number(taskId));
    if (!task) {
      await ctx.reply(MESSAGES.taskDoneNotFound);
      return;
    }

    await ctx.reply(MESSAGES.doneSuccess(taskId));
  }
}
