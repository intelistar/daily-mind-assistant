import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExerciseDto) {
    const exercise = await this.prisma.exercise.create({ data: dto });
    return exercise;
  }

  async getAll() {
    const exercises = await this.prisma.exercise.findMany();
    return exercises;
  }

  async update(id: string, dto: UpdateExerciseDto) {
    const existingExercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!existingExercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    const updatedExercise = await this.prisma.exercise.update({
      where: { id },
      data: dto,
    });

    return updatedExercise;
  }

  async delete(id: string) {
    const existingExercise = await this.prisma.exercise.findUnique({
      where: { id },
    });

    if (!existingExercise) {
      throw new NotFoundException(`Exercise with id ${id} not found`);
    }

    const deletedExercise = await this.prisma.exercise.delete({
      where: { id },
    });

    return deletedExercise.id;
  }

  async getRandom() {
    const count = await this.prisma.exercise.count();
    const randomIndex = Math.floor(Math.random() * count);
    const exercise = await this.prisma.exercise.findMany({
      take: 1,
      skip: randomIndex,
    });
    return exercise[0];
  }
}
