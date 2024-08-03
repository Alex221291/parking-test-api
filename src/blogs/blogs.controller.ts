import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BlogsService } from './blogs.service'
import { BlogDto } from './dto/blog.dto'
import { PublicRoute } from 'src/infrastructure/decorators/public-route.decorator'

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  create(@Body() blogDto: BlogDto) {
    return this.blogsService.create(blogDto)
  }

  @PublicRoute()
  @Get()
  findAll() {
    return this.blogsService.findAll()
  }

  @PublicRoute()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() blogDto: BlogDto) {
    return this.blogsService.update(+id, blogDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id)
  }
}
