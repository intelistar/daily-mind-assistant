import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ExercisesModule,
    TasksModule,
    ScheduleModule.forRoot(),
    HealthModule,
  ],
})
export class AppModule {}
