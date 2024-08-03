import { UnauthorizedException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'
import { User } from 'src/users/entities/user.entity'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/sign-in.dto'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.validateUser(signInDto.username, signInDto.password)
    const payload = { sub: user.id }
    const jwtSecret = this.configService.get('JWT_SECRET')
    const jwtLifetime = this.configService.get('JWT_LIFETIME')
    if (!jwtSecret) {
      throw new Error('JWT secret is not specified in the environment')
    }
    if (!jwtLifetime) {
      throw new Error('JWT lifetime is not specified in the environment')
    }
    const accessToken = this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: jwtLifetime,
    })
    return { accessToken }
  }

  private async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(username)
    console.log('user:', user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials')
    }
    return user
  }
}
