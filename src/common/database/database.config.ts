import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const customerDatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.CUSTOMER_DB_HOST,
  port: +process.env.CUSTOMER_DB_PORT,
  username: process.env.CUSTOMER_DB_USER,
  password: process.env.CUSTOMER_DB_PASS,
  database: process.env.CUSTOMER_DB_NAME,
  synchronize: true, // Set to false for production
  manualInitialization: true,
  logging: true,
  connectTimeout: 10000,  // Timeout for initial connection in ms
  retryAttempts: 3,  // Retry the connection 3 times before failing
  retryDelay: 3000,
  name: 'customerConnection',
};

export const driverDatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DRIVER_DB_HOST,
  port: +process.env.DRIVER_DB_PORT,
  username: process.env.DRIVER_DB_USER,
  password: process.env.DRIVER_DB_PASS,
  database: process.env.DRIVER_DB_NAME,
  manualInitialization: true,
  synchronize: true, // Set to false for production
  logging: true,
  connectTimeout: 10000,  // Timeout for initial connection in ms
  retryAttempts: 3,  // Retry the connection 3 times before failing
  retryDelay: 3000, 
  name: 'driverConnection',
};

export const generalDatabaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, // Set to false for production
  manualInitialization: true,
  logging: true,
  connectTimeout: 10000,  // Timeout for initial connection in ms
  retryAttempts: 3,  // Retry the connection 3 times before failing
  retryDelay: 3000,
  name: 'generalConnection',
};