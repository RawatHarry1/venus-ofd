// src/customer/customer.controller.ts
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  UsePipes,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import {
  CreateCustomerDto,
  CreateCustomerSchema,
  UpdateCustomerDto,
  UpdateCustomerSchema,
  CustomerIdSchema,
} from './dto/customer';
import {
  CommonQueryDto,
  CommonQuerySchema,
} from '../common/dto/common-query.dto'; // DTO and schema for query

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(CommonQuerySchema)) // Apply Joi validation to query params
  async getAllCustomers(
    @Query() query: CommonQueryDto, // Query parameters will be validated
  ) {

    //return "hello sir";
    return await this.customerService.getAllCustomers(query);
  }

  // Get customer by ID
  @Get(':id')
  @UsePipes(new JoiValidationPipe(CustomerIdSchema)) // Validate the ID parameter
  async getCustomerById(
    @Param('id') id: number, // ID parameter will be validated
  ) {
    return await this.customerService.getCustomerById(id);
  }

  // Create a new customer
  @Post()
  @UsePipes(new JoiValidationPipe(CreateCustomerSchema)) // Validate the body for creating customer
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto, // Request body will be validated
  ) {
    return await this.customerService.createCustomer(
      createCustomerDto.name,
      createCustomerDto.email,
      createCustomerDto.phone,
    );
  }

  // Update an existing customer
  @Patch(':id')
  @UsePipes(new JoiValidationPipe(CustomerIdSchema)) // Validate the ID parameter
  @UsePipes(new JoiValidationPipe(UpdateCustomerSchema)) // Validate the request body for update
  async updateCustomer(
    @Param('id') id: number, // ID parameter will be validated
    @Body() updateCustomerDto: UpdateCustomerDto, // Request body will be validated
  ) {
    return await this.customerService.updateCustomer(
      id,
      updateCustomerDto.name,
      updateCustomerDto.email,
      updateCustomerDto.phone,
    );
  }

  // Delete a customer by ID
  @Delete(':id')
  @UsePipes(new JoiValidationPipe(CustomerIdSchema)) // Validate the ID parameter
  async deleteCustomer(
    @Param('id') id: number, // ID parameter will be validated
  ) {
    return await this.customerService.deleteCustomer(id);
  }
}
