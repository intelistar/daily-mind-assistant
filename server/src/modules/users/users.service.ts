import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { CreateTelegramUserDto } from './dto/create-telegram-user';
import { UserRole } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    const users = await this.prisma.user.findMany({ include: { tasks: true } });
    return users;
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({ data: dto });
    return user;
  }

  async createFromTelegram(dto: CreateTelegramUserDto) {
    let user = await this.prisma.user.findUnique({
      where: { telegramId: dto.telegramId },
    });

    if (user) {
      return { user };
    }

    const existingByEmail = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingByEmail) {
      user = await this.prisma.user.update({
        where: { email: dto.email },
        data: { telegramId: dto.telegramId },
      });

      return { user };
    }

    user = await this.prisma.user.create({ data: dto });
    return { user };
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: dto.userId },
      data: { role: dto.role },
    });

    return updatedUser;
  }

  async getAllWithUserRole() {
    const users = await this.prisma.user.findMany({
      where: {
        role: UserRole.USER,
      },
      select: {
        id: true,
        telegramId: true,
      },
    });

    return users;
  }

  async findByTgId(telegramId: string) {
    return this.prisma.user.findUnique({ where: { telegramId } });
  }
}
