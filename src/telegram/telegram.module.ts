import { Module } from '@nestjs/common'
import { TelegramService } from './telegram.service'
import { TelegrafModule } from 'nestjs-telegraf'
import { options } from './telegram-config.factory'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TelegramChat } from './entities/telegram.entity'
import { TelegramChatService } from './telegram-chat.service'

@Module({
  imports: [TypeOrmModule.forFeature([TelegramChat]), TelegrafModule.forRootAsync(options())],
  providers: [TelegramService, TelegramChatService],
  exports: [TelegramChatService],
})
export class TelegramModule {}
