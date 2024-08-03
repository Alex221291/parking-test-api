import { Controller, Post, Body, Delete, Param, ParseIntPipe, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { RequiredRoles } from 'src/infrastructure/decorators/required-roles.decorator'
import { UserRolesEnum } from 'src/infrastructure/enums/user-roles.enum'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @RequiredRoles(UserRolesEnum.SuperAdmin)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id)
  }
}
