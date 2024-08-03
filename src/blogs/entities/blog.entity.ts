import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Blogs' })
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 256 })
  title: string

  @Column({ type: 'varchar', length: 256 })
  description: string

  @Column({ type: 'varchar', length: 256 })
  imagePath: string | null

  @CreateDateColumn()
  createdAt: Date
}
