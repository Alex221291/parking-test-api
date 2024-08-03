import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'
import { SignInDto } from './dto/sign-in.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicRoute()
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto)
  }
}
