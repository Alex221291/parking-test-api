import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const isUserExisting = await this.userRepository.exist({
      where: { username: createUserDto.username },
    })
    if (isUserExisting) {
      throw new ForbiddenException(`Username ${createUserDto.username} is already used`)
    }
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(createUserDto.password, salt)
    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    })
    return this.userRepository.save(user)
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find()
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    return user
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username })
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`)
    }
    return user
  }

  async remove(id: number): Promise<void> {
    const isUserExisting = await this.userRepository.exist({ where: { id } })
    if (!isUserExisting) {
      throw new NotFoundException(`User with id ${id} not found`)
    }
    await this.userRepository.delete(id)
  }
}
