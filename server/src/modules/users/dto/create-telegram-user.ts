import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTelegramUserDto {
  @IsString()
  @IsNotEmpty()
  telegramId: string;

  @IsString()
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;
}
