import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { CallRequest } from './entities/call-request.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CallRequestDto } from './dto/call-request.dto'
import { CallRequestStatusesEnum } from './enums/call-requests-statuses.enum'

@Injectable()
export class CallRequestsService {
  constructor(
    @InjectRepository(CallRequest)
    private callRequestRepository: Repository<CallRequest>,
  ) {}

  create(callRequestDto: CallRequestDto): Promise<CallRequest> {
    const callRequest = this.callRequestRepository.create({
      ...callRequestDto,
      status: CallRequestStatusesEnum.Idle,
    })
    return this.callRequestRepository.save(callRequest)
  }

  findAll(): Promise<CallRequest[]> {
    return this.callRequestRepository.find()
  }

  async findOne(id: number): Promise<CallRequest> {
    const callRequest = await this.callRequestRepository.findOneBy({ id })
    if (!callRequest) {
      throw new NotFoundException(`Call request with id ${id} not found`)
    }
    return callRequest
  }

  async updateStatus(id: number, status: CallRequestStatusesEnum): Promise<void> {
    const callRequest = await this.callRequestRepository.findOneBy({ id })
    if (!callRequest) {
      throw new NotFoundException(`Call request with id ${id} not found`)
    }
    if (callRequest.status !== CallRequestStatusesEnum.Idle) {
      throw new BadRequestException(`Call request with id ${id} has already been closed`)
    }
    callRequest.status = status
    await this.callRequestRepository.save(callRequest)
  }

  async remove(id: number): Promise<void> {
    const isCallRequestExisting = await this.callRequestRepository.exist({
      where: { id },
    })
    if (!isCallRequestExisting) {
      throw new NotFoundException(`Call request with id ${id} not found`)
    }
    await this.callRequestRepository.delete(id)
  }
}
