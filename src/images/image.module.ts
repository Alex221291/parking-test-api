import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ImageController } from './image.controller'
import { BlogsService } from '../blogs/blogs.service'
import { BlogsModule } from '../blogs/blogs.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Blog } from '../blogs/entities/blog.entity'
import { ImageService } from './image.service'

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', // путь для сохранения загруженных файлов
    }),
    TypeOrmModule.forFeature([Blog]),
    BlogsModule,
  ],
  providers: [BlogsService, ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
