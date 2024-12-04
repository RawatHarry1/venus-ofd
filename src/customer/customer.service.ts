
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { DataSource } from 'typeorm'; 
import { InjectDataSource } from '@nestjs/typeorm';
import {
  CommonQueryDto,
  CommonQuerySchema,
} from '../common/dto/common-query.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectDataSource('customerConnection') private readonly manager: DataSource, // Inject the correct DataSource
  ) {}

  // Get all customers using raw SQL
  async getAllCustomers(CommonQueryDto): Promise<any> {
    const query = 'SELECT * FROM venus.live.tb_users limit 10'; // Replace 'customer' with your table name
    console.log("query::",query);
    console.log("manager::",this.manager.manager);
    //JSON.stringify(this.manager.manager);
    return await this.manager.query(query); // Execute raw query
  }

  // Get customer by id using raw SQL
  async getCustomerById(id: number): Promise<any> {
    const query = 'SELECT * FROM customer WHERE id = ?';
    return await this.manager.query(query, [id]); // Use parameterized queries to avoid SQL injection
  }

  // Create a new customer using raw SQL
  async createCustomer(
    name: string,
    email: string,
    phone: string,
  ): Promise<any> {
    const query = 'INSERT INTO customer (name, email, phone) VALUES (?, ?, ?)';
    return await this.manager.query(query, [name, email, phone]); // Use parameterized queries to avoid SQL injection
  }

  // Update customer by id using raw SQL
  async updateCustomer(
    id: number,
    name: string,
    email: string,
    phone: string,
  ): Promise<any> {
    const query =
      'UPDATE customer SET name = ?, email = ?, phone = ? WHERE id = ?';
    return await this.manager.query(query, [name, email, phone, id]);
  }

  // Delete customer by id using raw SQL
  async deleteCustomer(id: number): Promise<any> {
    const query = 'DELETE FROM customer WHERE id = ?';
    return await this.manager.query(query, [id]);
  }
}
