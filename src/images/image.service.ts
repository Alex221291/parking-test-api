import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Blog } from '../blogs/entities/blog.entity'
import { BlogsService } from '../blogs/blogs.service'

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    private readonly blogsService: BlogsService,
  ) {}
}
