import { Injectable } from '@nestjs/common';
import { SessionContext } from '../telegram.context';
import { DoneHandler } from './done.handler';
import { Message } from 'telegraf/typings/core/types/typegram';
import { StepService } from '../steps/steps.service';
import { COMMANDS } from '../constants/commands';

@Injectable()
export class TextHandler {
  constructor(
    private readonly doneHandler: DoneHandler,
    private readonly stepService: StepService,
  ) {}

  async handle(ctx: SessionContext) {
    const message = ctx.message as Message.TextMessage;
    const text = message.text.trim();

    if (text?.startsWith(COMMANDS.done)) {
      await this.doneHandler.handle(ctx, text);
      return;
    }

    await this.stepService.handleStep(ctx);
  }
}
