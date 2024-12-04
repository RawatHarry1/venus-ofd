import * as Joi from 'joi';

export class CommonQueryDto {
  limit: number;
  skip: number;
  sort: string;
}

export const CommonQuerySchema = Joi.object({
  limit: Joi.number().min(1).default(10).optional(),
  skip: Joi.number().min(0).default(0).optional(),
  sort: Joi.string().valid('asc', 'desc').optional(),
});
