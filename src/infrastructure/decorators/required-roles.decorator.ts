import { SetMetadata } from '@nestjs/common'
import { UserRolesEnum } from '../enums/user-roles.enum'

export const REQUIRED_ROLES_KEY = 'required_roles'
export const RequiredRoles = (...roles: UserRolesEnum[]) =>
  SetMetadata(REQUIRED_ROLES_KEY, roles)
