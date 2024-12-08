import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  customerDatabaseConfig,
  driverDatabaseConfig,
  generalDatabaseConfig
} from './common/database/database.config';
import { CustomerModule } from './customer/customer.module';
import { DriverModule } from './driver/driver.module';
import { AuthModule } from './auth/auth.module';
import { ConfigServiceExtended } from './config/config.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
const envData = process.env;
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => ({})], // Placeholder to use the extended ConfigService
      isGlobal: true, // Makes config available globally,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      name: 'venus_auth',
      host: envData.DB_HOST,
      port: +envData.DB_PORT,
      username: envData.DB_USER,
      password: envData.DB_PASS,
      database: envData.DB_NAME,
      logging: true
    }),
  /* TypeOrmModule.forRoot({ 
      name: "venus_live", // Unique name
      type: 'mssql', 
      host: envData.CUSTOMER_DB_HOST,
      port: +envData.CUSTOMER_DB_PORT,
      username: envData.CUSTOMER_DB_USER,
      password: envData.CUSTOMER_DB_PASS,
      database: envData.CUSTOMER_DB_NAME,
  }),
   /*  TypeOrmModule.forRoot(customerDatabaseConfig), // Customer DB
    TypeOrmModule.forRoot(driverDatabaseConfig), // Driver DB */
    /* RedisModule.forRoot(redisConfig), */ // Redis
    TypeOrmModule.forRoot(generalDatabaseConfig), // Driver DB */
    CustomerModule,
    DriverModule,
    AuthModule,
    // Add other modules here
  ],
  controllers: [AppController],
  providers: [ConfigServiceExtended,AppService],
})
export class AppModule {}
