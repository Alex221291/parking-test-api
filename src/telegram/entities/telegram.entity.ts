import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity({ name: 'TelegramChats' })
export class TelegramChat {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  chatId: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
