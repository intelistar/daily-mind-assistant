import { Injectable } from '@nestjs/common';
import { SessionContext } from '../telegram.context';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class HelpHandler {
  async handle(ctx: SessionContext) {
    await ctx.reply(MESSAGES.help);
  }
}
