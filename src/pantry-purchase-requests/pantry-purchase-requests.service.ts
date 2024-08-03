import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PantryPurchaseRequest } from './entities/pantry-purchase-request.entity'
import { Not, Repository } from 'typeorm'
import { PantryPlacesService } from 'src/pantry-places/pantry-places.service'
import { PantryPurchaseRequestDto } from './dto/pantry-purchase-request.dto'
import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'
import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'
import { UpdatePantryPurchaseRequestStatusDto } from './dto/update-pantry-purchase-request-status.dto'

@Injectable()
export class PantryPurchaseRequestsService {
  constructor(
    @InjectRepository(PantryPurchaseRequest)
    private purchaseRequestRepository: Repository<PantryPurchaseRequest>,
    private pantryPlacesService: PantryPlacesService,
  ) {}

  async create(
    purchaseRequestDto: PantryPurchaseRequestDto,
  ): Promise<PantryPurchaseRequest> {
    const isPantryPurchaseRequestForPantryPlaceExisting =
      await this.purchaseRequestRepository.exist({
        where: {
          status: Not(PurchaseRequestStatusesEnum.Rejected),
          pantryPlace: { id: purchaseRequestDto.pantryPlaceId },
        },
      })
    if (isPantryPurchaseRequestForPantryPlaceExisting) {
      throw new BadRequestException(
        `Purchase request with pantry place id ${purchaseRequestDto.pantryPlaceId} already exists`,
      )
    }
    const pantryPlace = await this.pantryPlacesService.findOne(
      purchaseRequestDto.pantryPlaceId,
    )
    const purchaseRequest = this.purchaseRequestRepository.create({
      ...purchaseRequestDto,
      pantryPlace,
      status: PurchaseRequestStatusesEnum.InProcess,
    })
    await this.purchaseRequestRepository.save(purchaseRequest)
    await this.pantryPlacesService.update(pantryPlace.id, {
      area: pantryPlace.area,
      currentPrice: pantryPlace.currentPrice,
      floor: pantryPlace.floor,
      previousPrice: pantryPlace.previousPrice,
      status: PlaceStatusesEnum.Booked,
      displayedNo: pantryPlace.displayedNo,
    })
    return purchaseRequest
  }

  findAll(): Promise<PantryPurchaseRequest[]> {
    return this.purchaseRequestRepository.find({ relations: { pantryPlace: true } })
  }

  async findOne(id: number): Promise<PantryPurchaseRequest> {
    const purchaseRequest = await this.purchaseRequestRepository.findOne({
      where: { id },
      relations: { pantryPlace: true },
    })
    if (!purchaseRequest) {
      throw new NotFoundException(`Purchase request with id ${id} not found`)
    }
    return purchaseRequest
  }

  async updateStatus(
    updatePantryPurchaseRequestStatusDto: UpdatePantryPurchaseRequestStatusDto,
  ): Promise<void> {
    const purchaseRequest = await this.purchaseRequestRepository.findOne({
      where: { id: updatePantryPurchaseRequestStatusDto.id },
      relations: { pantryPlace: true },
    })
    if (!purchaseRequest) {
      throw new NotFoundException(
        `Purchase request with id ${updatePantryPurchaseRequestStatusDto.id} not found`,
      )
    }
    purchaseRequest.status = updatePantryPurchaseRequestStatusDto.status
    const pantryPlace = await this.pantryPlacesService.findOne(
      purchaseRequest.pantryPlace.id,
    )
    if (
      updatePantryPurchaseRequestStatusDto.status ===
      PurchaseRequestStatusesEnum.InProcess
    ) {
      pantryPlace.status = PlaceStatusesEnum.Booked
    }
    if (
      updatePantryPurchaseRequestStatusDto.status === PurchaseRequestStatusesEnum.Approved
    ) {
      pantryPlace.status = PlaceStatusesEnum.Sold
    }
    if (
      updatePantryPurchaseRequestStatusDto.status !==
        PurchaseRequestStatusesEnum.Approved &&
      updatePantryPurchaseRequestStatusDto.status !==
        PurchaseRequestStatusesEnum.InProcess
    ) {
      pantryPlace.status = PlaceStatusesEnum.Free
    }
    await this.purchaseRequestRepository.save(purchaseRequest)
    await this.pantryPlacesService.update(pantryPlace.id, { ...pantryPlace })
  }

  async remove(id: number): Promise<void> {
    const isPantryPurchaseRequestExisting = await this.purchaseRequestRepository.exist({
      where: { id },
    })
    if (!isPantryPurchaseRequestExisting) {
      throw new NotFoundException(`Purchase request with id ${id} not found`)
    }
    await this.purchaseRequestRepository.delete(id)
  }
}
