import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common'
import { CallRequestsService } from './call-requests.service'
import { CallRequestDto } from './dto/call-request.dto'
import { CallRequestStatusesEnum } from './enums/call-requests-statuses.enum'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { TelegramChatService } from 'src/telegram/telegram-chat.service'

@Controller('call-requests')
export class CallRequestsController {
  constructor(private readonly callRequestsService: CallRequestsService,
    private readonly telegramChatService: TelegramChatService
  ) {}

  @PublicRoute()
  @Post()
  async create(@Body() callRequestDto: CallRequestDto) {
    const result = await this.callRequestsService.create(callRequestDto);
    const text = `Заявка на звонок (В ожидании)
Дата: ${result.createdAt.toLocaleDateString('ru-RU')}
Имя: ${result.customerName}
Телефон: ${result.customerPhoneNumber}`;
        await this.telegramChatService.sendMessage(text);
    return result;
  }

  @Get()
  findAll() {
    return this.callRequestsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.callRequestsService.findOne(id)
  }

  @Patch(':id/close')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.callRequestsService.updateStatus(id, CallRequestStatusesEnum.Closed)
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.callRequestsService.remove(id)
  }
}
