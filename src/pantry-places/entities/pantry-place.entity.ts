import { PlaceStatusesEnum } from 'src/infrastructure/enums/place-statuses.enum'
import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'PantryPlaces' })
export class PantryPlace {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  displayedNo: number

  @Column()
  floor: number

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
