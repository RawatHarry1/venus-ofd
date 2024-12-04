// src/customer/dto/create-customer.dto.ts
import * as Joi from 'joi';

// Define the Joi schema for the "create customer" body
export class CreateCustomerDto {
  name: string;
  email: string;
  phone: string;
}

// Joi schema for validation
export const CreateCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': `"name" should be a type of 'text'`,
    'string.empty': `"name" cannot be an empty field`,
    'string.min': `"name" should have a minimum length of {#limit}`,
    'string.max': `"name" should have a maximum length of {#limit}`,
    'any.required': `"name" is a required field`,
  }),
  email: Joi.string().email().required().messages({
    'string.base': `"email" should be a type of 'text'`,
    'string.empty': `"email" cannot be an empty field`,
    'string.email': `"email" must be a valid email address`,
    'any.required': `"email" is a required field`,
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.base': `"phone" should be a type of 'text'`,
      'string.empty': `"phone" cannot be an empty field`,
      'string.pattern.base': `"phone" must be a valid phone number with 10 digits`,
      'any.required': `"phone" is a required field`,
    }),
});

export class UpdateCustomerDto {
  name?: string;
  email?: string;
  phone?: string;
}

export const UpdateCustomerSchema = Joi.object({
  name: Joi.string().min(3).max(50).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .optional(),
});

export const CustomerIdSchema = Joi.object({
  id: Joi.number().integer().positive().required(),
});
