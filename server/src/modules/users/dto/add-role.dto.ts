import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'generated/prisma';

export class AddRoleDto {
  @IsString()
  readonly userId: string;

  @IsEnum(UserRole)
  readonly role: UserRole;
}
