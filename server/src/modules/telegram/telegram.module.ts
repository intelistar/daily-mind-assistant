import { forwardRef, Module } from '@nestjs/common';
// import { TelegrafModule } from 'nestjs-telegraf';
import { StepService } from './steps/steps.service';
// import * as LocalSession from 'telegraf-session-local';
import { UsersModule } from '../users/users.module';
import { TelegramUpdate } from './telegram.update';
import { TasksModule } from '../tasks/tasks.module';
import { TelegramService } from './telegram.service';
import { ConfigModule } from '@nestjs/config';
import { StartHandler } from './handlers/start.handler';
import { DoneHandler } from './handlers/done.handler';
import { HelpHandler } from './handlers/help.handler';
import { ProgressHandler } from './handlers/progress.handler';
import { TextHandler } from './handlers/text.handler';

@Module({
  imports: [
    // TelegrafModule.forRootAsync({
    //   useFactory: () => ({
    //     token: process.env.TELEGRAM_BOT_TOKEN!,
    //     middlewares: [
    //       new LocalSession({
    //         database: 'sessions.json',
    //         property: 'session',
    //       }).middleware(),
    //     ],
    //   }),
    // }),
    UsersModule,
    forwardRef(() => TasksModule),
    ConfigModule,
  ],
  providers: [
    TelegramUpdate,
    StepService,
    TelegramService,
    StartHandler,
    DoneHandler,
    HelpHandler,
    ProgressHandler,
    TextHandler,
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
