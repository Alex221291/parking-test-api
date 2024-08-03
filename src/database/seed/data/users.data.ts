import { UserRolesEnum } from 'src/infrastructure/enums/user-roles.enum'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

export const usersSeedData: CreateUserDto[] = [
  {
    username: 'super_admin',
    password: 'e3UAbQO0vg08ROe7PGj9V6Ur7447tRBV',
    role: UserRolesEnum.SuperAdmin,
  },
  {
    username: 'admin_1',
    password: '0yG07VYvzVJdGk1ZWg7aBVGvguVjHcJ8',
    role: UserRolesEnum.Admin,
  },
  {
    username: 'admin_2',
    password: '1SmANxmehW6G5tZsgb9ZPifHzEOKnyms',
    role: UserRolesEnum.Admin,
  },
  {
    username: 'Prozorov',
    password: 'ohLkSsWgP5Xkzrlt5t6JTpAc4L3SvNK9',
    role: UserRolesEnum.Admin,
  },
]
