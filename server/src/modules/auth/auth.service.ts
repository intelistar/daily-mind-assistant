import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { MESSAGES } from './constants/messages';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private generateToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  login(user: User) {
    return this.generateToken(user);
  }

  async register(dto: RegisterDto) {
    const candicate = await this.usersService.getUserByEmail(dto.email);
    if (candicate) {
      throw new ConflictException(MESSAGES.userExists);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 5);

    const newUser = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });

    return this.generateToken(newUser);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException(MESSAGES.userNotFound);

    if (user.password) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch)
        throw new UnauthorizedException(MESSAGES.invalidCredentials);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }
}
