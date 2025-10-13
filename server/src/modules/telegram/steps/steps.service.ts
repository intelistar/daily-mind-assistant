import { Injectable } from '@nestjs/common';
import { isValidEmail, isValidName } from './validators';
import { UsersService } from '../../users/users.service';
import { SessionContext } from '../telegram.context';
import { Message } from 'telegraf/typings/core/types/typegram';
import { Steps } from '../constants/steps.enum';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class StepService {
  constructor(private readonly usersService: UsersService) {}

  async handleStep(ctx: SessionContext) {
    const step = ctx.session.step;
    if (!step) return;

    switch (step) {
      case Steps.ASK_NAME:
        await this.handleName(ctx);
        break;

      case Steps.ASK_EMAIL:
        await this.handleEmail(ctx);
        break;

      default:
        await ctx.reply(MESSAGES.stepDefault);
        break;
    }
  }

  private async handleName(ctx: SessionContext) {
    const message = ctx.message as Message.TextMessage;
    const name = message.text.trim();

    if (!isValidName(name)) {
      await ctx.reply(MESSAGES.invalidName);
      return;
    }

    ctx.session.name = name;
    ctx.session.step = Steps.ASK_EMAIL;
    await ctx.reply(MESSAGES.askEmail);
  }

  private async handleEmail(ctx: SessionContext) {
    const message = ctx.message as Message.TextMessage;
    const email = message.text.trim();

    if (!isValidEmail(email)) {
      await ctx.reply(MESSAGES.invalidEmail);
      return;
    }

    ctx.session.email = email;

    if (!ctx.from) {
      await ctx.reply(MESSAGES.telegramNotFound);
      return;
    }

    const { user } = await this.usersService.createFromTelegram({
      telegramId: String(ctx.from.id),
      name: ctx.session.name!,
      email: ctx.session.email,
    });

    await ctx.reply(MESSAGES.welcome(user.name));
    ctx.session = {};
  }
}
