import { RequestUser } from './request-user';

export type RequestWithUser = Request & { user: RequestUser };
