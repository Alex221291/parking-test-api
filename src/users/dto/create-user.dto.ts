import { UserRolesEnum } from '../../infrastructure/enums/user-roles.enum'

export class CreateUserDto {
  username: string
  password: string
  role: UserRolesEnum
}
