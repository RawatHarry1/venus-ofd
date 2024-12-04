import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { customerDatabaseConfig } from '../common/database/database.config';

@Module({
  imports: [
    /* TypeOrmModule.forFeature([Customer]), // Import Customer entity here */
    TypeOrmModule.forRoot(customerDatabaseConfig), // Ensure that the connection for customer DB is included here
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
