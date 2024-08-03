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
import { PantryPurchaseRequestsService } from './pantry-purchase-requests.service'
import { PantryPurchaseRequestDto } from './dto/pantry-purchase-request.dto'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { UpdatePantryPurchaseRequestStatusDto } from './dto/update-pantry-purchase-request-status.dto'
import { TelegramChatService } from 'src/telegram/telegram-chat.service'
import { statusLabelsPurchaseRequest } from 'src/infrastructure/enums/purchase-requests-statuses.enum'

@Controller('pantry-purchase-requests')
export class PantryPurchaseRequestsController {
  constructor(
    private readonly pantryPurchaseRequestsService: PantryPurchaseRequestsService,
    private readonly telegramChatService: TelegramChatService
  ) {}

  @PublicRoute()
  @Post()
  async create(@Body() pantryPurchaseRequestDto: PantryPurchaseRequestDto) {
    const result = await this.pantryPurchaseRequestsService.create(pantryPurchaseRequestDto)
    const text = `Запрос на покупку кладовой №${result.pantryPlace.displayedNo} (${statusLabelsPurchaseRequest[result.status]})
Дата: ${result.createdAt.toLocaleDateString('ru-RU')}
Имя покупателя" ${result.customerName}
Телефон покупателя: ${result.customerPhoneNumber}
Почта покупателя: ${result.customerEmail}
Площадь места: ${result.pantryPlace.area}
Старая цена места: ${result.pantryPlace.previousPrice || 'Не указана'}
Текущая цена места: ${result.pantryPlace.currentPrice}`;
    await this.telegramChatService.sendMessage(text);
    return result;
  }

  @Get()
  findAll() {
    return this.pantryPurchaseRequestsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pantryPurchaseRequestsService.findOne(id)
  }

  @Patch(':id/update-status')
  approve(
    @Body() updatePantryPurchaseRequestStatusDto: UpdatePantryPurchaseRequestStatusDto,
  ) {
    return this.pantryPurchaseRequestsService.updateStatus(
      updatePantryPurchaseRequestStatusDto,
    )
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pantryPurchaseRequestsService.remove(id)
  }
}
