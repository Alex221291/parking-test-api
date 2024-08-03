import { UserRolesEnum } from 'src/infrastructure/enums/user-roles.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 32 })
  username: string

  @Column({ type: 'varchar', length: 256 })
  password: string

  @Column({ type: 'enum', enum: UserRolesEnum })
  role: UserRolesEnum
}
