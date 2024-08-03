import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'
import { ParkingPlace } from 'src/parking-places/entities/parking-place.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'PurchaseRequests' })
export class PurchaseRequest {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => ParkingPlace)
  parkingPlace: ParkingPlace

  @Column()
  customerName: string

  @Column()
  customerEmail: string

  @Column()
  customerPhoneNumber: string

  @Column({ enum: PurchaseRequestStatusesEnum })
  status: PurchaseRequestStatusesEnum

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
