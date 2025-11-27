import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { ROLES_KEY } from '../../../shared/constants/role-key';

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
