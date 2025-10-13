import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUser } from 'src/shared/types/request-user';
import { RequestWithUser } from 'src/shared/types/request-with-user';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): RequestUser => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
