import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SeedService } from './database/seed/seed.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const seedService = app.get(SeedService)
  await seedService.seedUsers()
  await seedService.seedParkingPlaces()
  await seedService.seedPantryPlaces()

  app.enableCors()
  await app.listen(3000)
}
bootstrap()
