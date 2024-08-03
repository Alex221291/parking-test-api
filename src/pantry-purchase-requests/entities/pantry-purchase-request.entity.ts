import { PurchaseRequestStatusesEnum } from 'src/infrastructure/enums/purchase-requests-statuses.enum'
import { PantryPlace } from 'src/pantry-places/entities/pantry-place.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'PantryPurchaseRequests' })
export class PantryPurchaseRequest {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => PantryPlace)
  pantryPlace: PantryPlace

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
