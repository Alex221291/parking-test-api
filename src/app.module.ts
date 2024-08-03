import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { databaseConfig } from './database/database.config'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { ParkingPlacesModule } from './parking-places/parking-places.module'
import { PurchaseRequestsModule } from './purchase-requests/purchase-requests.module'
import { CallRequestsModule } from './call-requests/call-requests.module'
import { SeedModule } from './database/seed/seed.module'
import { PantryPlacesModule } from './pantry-places/pantry-places.module'
import { PantryPurchaseRequestsModule } from './pantry-purchase-requests/pantry-purchase-requests.module'
import { BlogsModule } from './blogs/blogs.module'
import { ImageModule } from './images/image.module'
import { TelegramModule } from './telegram/telegram.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    ParkingPlacesModule,
    PurchaseRequestsModule,
    CallRequestsModule,
    SeedModule,
    PantryPlacesModule,
    PantryPurchaseRequestsModule,
    BlogsModule,
    ImageModule,
    TelegramModule,
  ],
})
export class AppModule {}
