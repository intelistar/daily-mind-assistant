import { Command, Ctx, Help, On, Start, Update } from 'nestjs-telegraf';
import { SessionContext } from './telegram.context';
import { StartHandler } from './handlers/start.handler';
import { HelpHandler } from './handlers/help.handler';
import { ProgressHandler } from './handlers/progress.handler';
import { TextHandler } from './handlers/text.handler';
import { COMMANDS } from './constants/commands';

@Update()
export class TelegramUpdate {
  constructor(
    private readonly startHandler: StartHandler,
    private readonly helpHandler: HelpHandler,
    private readonly progressHandler: ProgressHandler,
    private readonly textHandler: TextHandler,
  ) {}

  @Start()
  async start(@Ctx() ctx: SessionContext) {
    await this.startHandler.handle(ctx);
  }

  @Help()
  async help(@Ctx() ctx: SessionContext) {
    await this.helpHandler.handle(ctx);
  }

  @Command(COMMANDS.progress)
  async progress(@Ctx() ctx: SessionContext) {
    await this.progressHandler.handle(ctx);
  }

  @On('text')
  async text(@Ctx() ctx: SessionContext) {
    await this.textHandler.handle(ctx);
  }
}
