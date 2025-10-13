import { Length } from 'class-validator';

export class CreateExerciseDto {
  @Length(5)
  readonly text: string;
}
