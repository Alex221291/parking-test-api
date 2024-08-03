import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { CallRequestStatusesEnum } from '../enums/call-requests-statuses.enum'

@Entity({ name: 'CallRequests' })
export class CallRequest {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  customerName: string

  @Column()
  customerPhoneNumber: string

  @Column({ enum: CallRequestStatusesEnum })
  status: CallRequestStatusesEnum

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
