import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { ParkingPlaceTypesEnum } from '../enums/parking-place-types.enum'
import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'

@Entity({ name: 'ParkingPlaces' })
export class ParkingPlace {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayedNo: number

  @Column()
  floor: number

  @Column({ enum: ParkingPlaceTypesEnum })
  type: ParkingPlaceTypesEnum

  @Column({ type: 'float' })
  area: number

  @Column()
  currentPrice: number

  @Column()
  previousPrice: number

  @Column({ enum: PlaceStatusesEnum })
  status: PlaceStatusesEnum

  @UpdateDateColumn()
  updatedAt: Date
}
