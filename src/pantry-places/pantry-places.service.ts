import { Injectable, NotFoundException } from '@nestjs/common'
import { PantryPlaceDto } from './dto/pantry-place.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { PantryPlace } from './entities/pantry-place.entity'
import { Repository } from 'typeorm'

@Injectable()
export class PantryPlacesService {
  constructor(
    @InjectRepository(PantryPlace)
    private pantryPlaceRepository: Repository<PantryPlace>,
  ) {}

  create(pantryPlaceDto: { pantryPlaces: PantryPlaceDto[] }): Promise<PantryPlace[]> {
    const createPantryPlacePromises = pantryPlaceDto.pantryPlaces.map(
      (pantryPlaceSeedData) => {
        const pantryPlace = this.pantryPlaceRepository.create(pantryPlaceSeedData)
        return this.pantryPlaceRepository.save(pantryPlace)
      },
    )
    return Promise.all(createPantryPlacePromises)
  }

  findAll(): Promise<PantryPlace[]> {
    return this.pantryPlaceRepository.find({ order: { displayedNo: 'ASC' } })
  }

  async findOne(id: number): Promise<PantryPlace> {
    const pantryPlace = await this.pantryPlaceRepository.findOneBy({ id })
    if (!pantryPlace) {
      throw new NotFoundException(`Pantry place with id ${id} not found`)
    }
    return pantryPlace
  }

  async update(id: number, pantryPlaceDto: PantryPlaceDto): Promise<PantryPlace> {
    const pantryPlace = await this.pantryPlaceRepository.findOneBy({ id })
    if (!pantryPlace) {
      throw new NotFoundException(`Pantry place with id ${id} not found`)
    }
    const updatedPantryPlace = { ...pantryPlace, ...pantryPlaceDto }
    return this.pantryPlaceRepository.save(updatedPantryPlace)
  }

  async remove(ids: number[]): Promise<void> {
    const isPantryPlacesExistingPromises = ids.map((id) => {
      return this.pantryPlaceRepository.exist({ where: { id } })
    })
    const isPantryPlacesExisting = await Promise.all(isPantryPlacesExistingPromises)
    const notExistingPlaceIndex = isPantryPlacesExisting.findIndex(
      (isExisting) => isExisting === false,
    )
    if (notExistingPlaceIndex >= 0) {
      throw new NotFoundException(
        `Pantry place with id ${ids[notExistingPlaceIndex]} not found`,
      )
    }
    const deletePantryPlacesPromises = ids.map((id) => {
      return this.pantryPlaceRepository.delete(id)
    })
    await Promise.all(deletePantryPlacesPromises)
  }
}
