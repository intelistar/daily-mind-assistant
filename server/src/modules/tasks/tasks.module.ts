import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
// import { TelegramModule } from '../telegram/telegram.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TasksSchedulerService } from './tasks-scheduler.service';
import { UsersModule } from '../users/users.module';

import { ExercisesModule } from '../exercises/exercises.module';

@Module({
  imports: [
    // forwardRef(() => TelegramModule),
    PrismaModule,
    UsersModule,
    ExercisesModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksSchedulerService],
  exports: [TasksService],
})
export class TasksModule {}
