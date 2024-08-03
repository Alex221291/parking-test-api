import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { ParkingPlacesService } from './parking-places.service'
import { ParkingPlaceDto } from './dto/parking-place.dto'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { RequiredRoles } from 'src/infrastructure/decorators/required-roles.decorator'
import { UserRolesEnum } from 'src/infrastructure/enums/user-roles.enum'

@Controller('parking-places')
export class ParkingPlacesController {
  constructor(private readonly parkingPlacesService: ParkingPlacesService) {}

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Post()
  create(@Body() parkingPlaceDto: { parkingPlaces: ParkingPlaceDto[] }) {
    return this.parkingPlacesService.create(parkingPlaceDto)
  }

  @PublicRoute()
  @Get()
  findAll() {
    return this.parkingPlacesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parkingPlacesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() parkingPlaceDto: ParkingPlaceDto) {
    return this.parkingPlacesService.update(+id, parkingPlaceDto)
  }

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Delete()
  remove(@Body() deletePantryPlaceDto: { ids: number[] }) {
    return this.parkingPlacesService.remove(deletePantryPlaceDto.ids)
  }
}
