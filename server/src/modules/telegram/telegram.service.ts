import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<any>,
    private readonly config: ConfigService,
  ) {}

  async sendMessage(tgId: string, text: string) {
    await this.bot.telegram.sendMessage(tgId, text);
  }

  getBot() {
    return this.bot;
  }
}
