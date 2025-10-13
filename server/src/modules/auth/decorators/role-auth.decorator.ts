import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'generated/prisma';
import { ROLES_KEY } from 'src/shared/constants/role-key';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
