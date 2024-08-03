import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PurchaseRequest } from './entities/purchase-request.entity'
import { Not, Repository } from 'typeorm'
import { PurchaseRequestDto } from './dto/purchase-request.dto'
import { ParkingPlacesService } from 'src/parking-places/parking-places.service'
import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'
import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'
import { UpdatePurchaseRequestStatusDto } from './dto/update-purchase-request-status.dto'

@Injectable()
export class PurchaseRequestsService {
  constructor(
    @InjectRepository(PurchaseRequest)
    private purchaseRequestRepository: Repository<PurchaseRequest>,
    private parkingPlacesService: ParkingPlacesService,
  ) {}

  async create(purchaseRequestDto: PurchaseRequestDto): Promise<PurchaseRequest> {
    const isPurchaseRequestForParkingPlaceExisting =
      await this.purchaseRequestRepository.exist({
        where: {
          status: Not(PurchaseRequestStatusesEnum.Rejected),
          parkingPlace: { id: purchaseRequestDto.parkingPlaceId },
        },
      })
    if (isPurchaseRequestForParkingPlaceExisting) {
      throw new BadRequestException(
        `Purchase request with parking place id ${purchaseRequestDto.parkingPlaceId} already exists`,
      )
    }
    const parkingPlace = await this.parkingPlacesService.findOne(
      purchaseRequestDto.parkingPlaceId,
    )
    const purchaseRequest = this.purchaseRequestRepository.create({
      ...purchaseRequestDto,
      parkingPlace,
      status: PurchaseRequestStatusesEnum.InProcess,
    })
    await this.purchaseRequestRepository.save(purchaseRequest)
    await this.parkingPlacesService.update(parkingPlace.id, {
      area: parkingPlace.area,
      currentPrice: parkingPlace.currentPrice,
      floor: parkingPlace.floor,
      previousPrice: parkingPlace.previousPrice,
      status: PlaceStatusesEnum.Booked,
      type: parkingPlace.type,
      displayedNo: parkingPlace.displayedNo,
    })
    return purchaseRequest
  }

  findAll(): Promise<PurchaseRequest[]> {
    return this.purchaseRequestRepository.find({ relations: { parkingPlace: true } })
  }

  async findOne(id: number): Promise<PurchaseRequest> {
    const purchaseRequest = await this.purchaseRequestRepository.findOne({
      where: { id },
      relations: { parkingPlace: true },
    })
    if (!purchaseRequest) {
      throw new NotFoundException(`Purchase request with id ${id} not found`)
    }
    return purchaseRequest
  }

  async updateStatus(
    updatePurchaseRequestStatusDto: UpdatePurchaseRequestStatusDto,
  ): Promise<void> {
    const purchaseRequest = await this.purchaseRequestRepository.findOne({
      where: { id: updatePurchaseRequestStatusDto.id },
      relations: { parkingPlace: true },
    })
    if (!purchaseRequest) {
      throw new NotFoundException(
        `Purchase request with id ${updatePurchaseRequestStatusDto.id} not found`,
      )
    }
    purchaseRequest.status = updatePurchaseRequestStatusDto.status
    const parkingPlace = await this.parkingPlacesService.findOne(
      purchaseRequest.parkingPlace.id,
    )
    if (updatePurchaseRequestStatusDto.status === PurchaseRequestStatusesEnum.InProcess) {
      parkingPlace.status = PlaceStatusesEnum.Booked
    }
    if (updatePurchaseRequestStatusDto.status === PurchaseRequestStatusesEnum.Approved) {
      parkingPlace.status = PlaceStatusesEnum.Sold
    }
    if (
      updatePurchaseRequestStatusDto.status !== PurchaseRequestStatusesEnum.Approved &&
      updatePurchaseRequestStatusDto.status !== PurchaseRequestStatusesEnum.InProcess
    ) {
      parkingPlace.status = PlaceStatusesEnum.Free
    }
    await this.purchaseRequestRepository.save(purchaseRequest)
    await this.parkingPlacesService.update(parkingPlace.id, { ...parkingPlace })
  }

  async remove(id: number): Promise<void> {
    const isPurchaseRequestExisting = await this.purchaseRequestRepository.exist({
      where: { id },
    })
    if (!isPurchaseRequestExisting) {
      throw new NotFoundException(`Purchase request with id ${id} not found`)
    }
    await this.purchaseRequestRepository.delete(id)
  }
}
