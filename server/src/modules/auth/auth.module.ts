import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { CookieService } from './cookie.service';

import { JWT_EXPIRES } from './constants/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CookieService, LocalStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: JWT_EXPIRES,
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
