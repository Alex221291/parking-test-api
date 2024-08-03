import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ParkingPlace } from './entities/parking-place.entity'
import { ParkingPlaceDto } from './dto/parking-place.dto'

@Injectable()
export class ParkingPlacesService {
  constructor(
    @InjectRepository(ParkingPlace)
    private parkingPlaceRepository: Repository<ParkingPlace>,
  ) {}

  create(parkingPlaceDto: { parkingPlaces: ParkingPlaceDto[] }): Promise<ParkingPlace[]> {
    const createParkingPlacePromises = parkingPlaceDto.parkingPlaces.map(
      (parkingPlaceSeedData) => {
        const parkingPlace = this.parkingPlaceRepository.create(parkingPlaceSeedData)
        return this.parkingPlaceRepository.save(parkingPlace)
      },
    )
    return Promise.all(createParkingPlacePromises)
  }

  findAll(): Promise<ParkingPlace[]> {
    return this.parkingPlaceRepository.find({ order: { displayedNo: 'ASC' } })
  }

  async findOne(id: number): Promise<ParkingPlace> {
    const parkingPlace = await this.parkingPlaceRepository.findOneBy({ id })
    if (!parkingPlace) {
      throw new NotFoundException(`Parking place with id ${id} not found`)
    }
    return parkingPlace
  }

  async update(id: number, parkingPlaceDto: ParkingPlaceDto): Promise<ParkingPlace> {
    const parkingPlace = await this.parkingPlaceRepository.findOneBy({ id })
    if (!parkingPlace) {
      throw new NotFoundException(`Parking place with id ${id} not found`)
    }
    const updatedParkingPlace = { ...parkingPlace, ...parkingPlaceDto }
    return this.parkingPlaceRepository.save(updatedParkingPlace)
  }

  async remove(ids: number[]): Promise<void> {
    const isParkingPlacesExistingPromises = ids.map((id) => {
      return this.parkingPlaceRepository.exist({ where: { id } })
    })
    const isParkingPlacesExisting = await Promise.all(isParkingPlacesExistingPromises)
    const notExistingPlaceIndex = isParkingPlacesExisting.findIndex(
      (isExisting) => isExisting === false,
    )
    if (notExistingPlaceIndex >= 0) {
      throw new NotFoundException(
        `Pantry place with id ${ids[notExistingPlaceIndex]} not found`,
      )
    }
    const deleteParkingPlacesPromises = ids.map((id) => {
      return this.parkingPlaceRepository.delete(id)
    })
    await Promise.all(deleteParkingPlacesPromises)
  }
}
