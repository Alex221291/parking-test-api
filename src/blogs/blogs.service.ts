import { Injectable, NotFoundException } from '@nestjs/common'
import { BlogDto } from './dto/blog.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Blog } from './entities/blog.entity'
import { Repository } from 'typeorm'
import * as fs from 'fs'

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
  ) {}

  create(blogDto: BlogDto): Promise<Blog> {
    const blog = this.blogRepository.create(blogDto)
    return this.blogRepository.save(blog)
  }

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find({ order: { createdAt: 'ASC' } })
  }

  async findOne(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id })
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`)
    }
    return blog
  }

  async update(id: number, blogDto: BlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findOneBy({ id })
    if (!blog) {
      throw new NotFoundException(`Blog with id ${id} not found`)
    }
    const updatedBlog = { ...blog, ...blogDto }
    return this.blogRepository.save(updatedBlog)
  }

  async remove(id: number): Promise<void> {
    const isBlogExisting = await this.blogRepository.exist({
      where: { id },
    })
    if (!isBlogExisting) {
      throw new NotFoundException(`Blog with id ${id} not found`)
    }
    const blog = await this.blogRepository.findOneBy({ id })
    if (blog.imagePath) {
      fs.unlink(`./uploads/${blog.imagePath}`, (err) => {
        if (err) {
          throw new NotFoundException(`Image ${blog.imagePath} not found`)
        }
      })
    }
    await this.blogRepository.delete(id)
  }
}
