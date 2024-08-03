import { Module } from '@nestjs/common'
import { CallRequestsService } from './call-requests.service'
import { CallRequestsController } from './call-requests.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CallRequest } from './entities/call-request.entity'
import { TelegramModule } from 'src/telegram/telegram.module'

@Module({
  imports: [TypeOrmModule.forFeature([CallRequest]), TelegramModule],
  controllers: [CallRequestsController],
  providers: [CallRequestsService],
})
export class CallRequestsModule {}
