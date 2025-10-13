import { Injectable } from '@nestjs/common';
import { SessionContext } from '../telegram.context';
import { UsersService } from 'src/modules/users/users.service';
import { TasksService } from 'src/modules/tasks/tasks.service';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class ProgressHandler {
  constructor(
    private readonly usersService: UsersService,
    private readonly tasksService: TasksService,
  ) {}

  async handle(ctx: SessionContext) {
    const user = await this.usersService.findByTgId(String(ctx.from?.id));
    if (!user) {
      await ctx.reply(MESSAGES.notAuthorized);
      return;
    }

    const stats = await this.tasksService.getProgress(user.id);

    const message = MESSAGES.getProgressMessage(stats);

    await ctx.reply(message, { parse_mode: 'Markdown' });
  }
}
