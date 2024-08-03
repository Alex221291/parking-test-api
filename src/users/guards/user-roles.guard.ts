import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRolesEnum } from '../../infrastructure/enums/user-roles.enum'
import { UsersService } from '../users.service'
import { REQUIRED_ROLES_KEY } from 'src/infrastructure/decorators/required-roles.decorator'

@Injectable()
export class UserRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRolesEnum[] | undefined>(
      REQUIRED_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    )
    if (!requiredRoles) {
      return true
    }
    const {
      user: { id: userId },
    } = context.switchToHttp().getRequest<{ user: { id: number } }>()
    const user = await this.userService.findOneById(userId)
    if (!user) {
      throw new NotFoundException('Token contains not existing user')
    }
    return requiredRoles.some((role) => user.role === role)
  }
}
