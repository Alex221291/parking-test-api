import { Module } from '@nestjs/common'
import { ParkingPlacesService } from './parking-places.service'
import { ParkingPlacesController } from './parking-places.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ParkingPlace } from './entities/parking-place.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ParkingPlace])],
  controllers: [ParkingPlacesController],
  providers: [ParkingPlacesService],
  exports: [ParkingPlacesService],
})
export class ParkingPlacesModule {}
