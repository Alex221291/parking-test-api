import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
const dataSourceConfig: DataSourceOptions = {
  type: process.env.DATABASE_TYPE as any,
  // host: process.env.DATABASE_HOST,
  // port: parseInt(process.env.DATABASE_PORT),
  // database: process.env.DATABASE_NAME,
  // username: process.env.DATABASE_USERNAME,
  // password: process.env.DATABASE_PASSWORD,
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity.js'],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  migrationsTableName: 'typeorm_migrations',
  migrationsTransactionMode: 'all',
}

export const databaseConfig: TypeOrmModuleOptions = {
  ...dataSourceConfig,
  autoLoadEntities: true,
}

export const dataSource = new DataSource(dataSourceConfig)
