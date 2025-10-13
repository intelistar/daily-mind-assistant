import { Context as TelegrafContext } from 'telegraf';
import { Steps } from './constants/steps.enum';

export interface SessionData {
  step?: Steps;
  name?: string;
  email?: string;
}

export interface SessionContext extends TelegrafContext {
  session: SessionData;
}
