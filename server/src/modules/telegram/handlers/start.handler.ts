import { Injectable } from '@nestjs/common';
import { SessionContext } from '../telegram.context';
import { Steps } from '../constants/steps.enum';
import { MESSAGES } from '../constants/messages';

@Injectable()
export class StartHandler {
  async handle(ctx: SessionContext) {
    ctx.session = { step: Steps.ASK_NAME };
    await ctx.reply(MESSAGES.askName);
  }
}
