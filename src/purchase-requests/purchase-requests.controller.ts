import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
} from '@nestjs/common'
import { PurchaseRequestsService } from './purchase-requests.service'
import { PurchaseRequestDto } from './dto/purchase-request.dto'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { UpdatePurchaseRequestStatusDto } from './dto/update-purchase-request-status.dto'
import { TelegramChatService } from 'src/telegram/telegram-chat.service'
import { statusLabelsPurchaseRequest } from 'src/infrastructure/enums/purchase-requests-statuses.enum'
import { statusLabelsParkingPlaceTypes } from 'src/parking-places/enums/parking-place-types.enum'

@Controller('purchase-requests')
export class PurchaseRequestsController {
  constructor(private readonly purchaseRequestsService: PurchaseRequestsService,
    private readonly telegramChatService: TelegramChatService
  ) {}

  @PublicRoute()
  @Post()
  async create(@Body() purchaseRequestDto: PurchaseRequestDto) {
    const result = await this.purchaseRequestsService.create(purchaseRequestDto);
    const text = `Запрос на покупку места ${result.parkingPlace.displayedNo} (${statusLabelsPurchaseRequest[result.status]})
Дата: ${result.createdAt.toLocaleDateString('ru-RU')}
Имя покупателя: ${result.customerName}
Телефон покупателя: ${result.customerPhoneNumber}
Почта покупателя: ${result.customerEmail}
Площадь места: ${result.parkingPlace.area}
Старая цена места: ${result.parkingPlace.previousPrice || 'Не указана'}
Текущая цена места: ${result.parkingPlace.currentPrice}
Тип места: ${statusLabelsParkingPlaceTypes[result.parkingPlace.type]}`;
    await this.telegramChatService.sendMessage(text);
    return result;
  }

  @Get()
  findAll() {
    return this.purchaseRequestsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseRequestsService.findOne(id)
  }

  @Patch(':id/update-status')
  approve(@Body() updatePurchaseRequestStatusDto: UpdatePurchaseRequestStatusDto) {
    return this.purchaseRequestsService.updateStatus(updatePurchaseRequestStatusDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.purchaseRequestsService.remove(id)
  }
}
