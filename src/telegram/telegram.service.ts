import { ConfigService } from '@nestjs/config';
import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Scenes, Telegraf } from 'telegraf';
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { TelegramChatService } from './telegram-chat.service';

export interface Context extends Scenes.SceneContext {}

@Update()
export class TelegramService extends Telegraf {
    private _token: string;
    constructor(
        private readonly config: ConfigService,
        private readonly telegramChatService: TelegramChatService
    ) {
        super(config.get('TELEGRAM_BOT_TOKEN'));
        this._token = config.get('TELEGRAM_BOT_TOKEN');
    }

    @PublicRoute()
    @Start()
    async onStart(@Ctx() ctx: Context) {
      const chatId = ctx.message.chat.id;
      const result = await this.telegramChatService.create(chatId);
      if(result){
        await ctx.reply('Рассылка заявок подключена - ' + chatId);
      } else{
        await ctx.reply('Вы уже подписаны на рассылку заявок - ' + chatId);
      }
    }

    @PublicRoute()
    @Command('stop')
    async onStop(@Ctx() ctx: Context) {
      const chatId = ctx.message.chat.id;
      const result = await this.telegramChatService.remove(chatId);
      if(result?.affected){
        await ctx.reply('Рассылка заявок отключена - ' + chatId);
      } else{
        await ctx.reply('Вы уже отписались от рассылки заявок - ' + chatId);
      }
    }

        // Добавляем обработчик события left_chat_member
    @PublicRoute()
    async onLeftChatMember(@Ctx() ctx: Context) {
      const chatId = ctx.message.chat.id;
      const result = await this.telegramChatService.remove(chatId);
      if(result?.affected){
        await ctx.reply('Бот удалён. Рассылка заявок отключена - ' + chatId);
      } else{
        await ctx.reply('Вы уже отписались от рассылки заявок - ' + chatId);
      }

      // Обработка события, когда бота удалили из группы
      console.log(`Бот был удален из чата ${chatId} пользователем`);
    }
}