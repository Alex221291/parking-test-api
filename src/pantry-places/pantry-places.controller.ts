import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PantryPlacesService } from './pantry-places.service'
import { RequiredRoles } from 'src/infrastructure/decorators/required-roles.decorator'
import { UserRolesEnum } from 'src/infrastructure/enums/user-roles.enum'
import { PantryPlaceDto } from './dto/pantry-place.dto'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'

@Controller('pantry-places')
export class PantryPlacesController {
  constructor(private readonly pantryPlacesService: PantryPlacesService) {}

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Post()
  create(@Body() pantryPlaceDto: { pantryPlaces: PantryPlaceDto[] }) {
    return this.pantryPlacesService.create(pantryPlaceDto)
  }

  @PublicRoute()
  @Get()
  findAll() {
    return this.pantryPlacesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pantryPlacesService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() pantryPlaceDto: PantryPlaceDto) {
    return this.pantryPlacesService.update(+id, pantryPlaceDto)
  }

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Delete()
  remove(@Body() deletePantryPlaceDto: { ids: number[] }) {
    return this.pantryPlacesService.remove(deletePantryPlaceDto.ids)
  }
}
