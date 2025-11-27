import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { UserRole } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

interface JwtPayload {
  email: string;
  sub: string;
  role: UserRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-cookie') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request & { cookies?: Record<string, string> }) => {
          if (req.cookies?.token) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return req.cookies.token;
          }
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY!,
    });
  }

  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}
