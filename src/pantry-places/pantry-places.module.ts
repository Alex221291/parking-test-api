import { Module } from '@nestjs/common'
import { PantryPlacesService } from './pantry-places.service'
import { PantryPlacesController } from './pantry-places.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PantryPlace } from './entities/pantry-place.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PantryPlace])],
  controllers: [PantryPlacesController],
  providers: [PantryPlacesService],
  exports: [PantryPlacesService],
})
export class PantryPlacesModule {}
