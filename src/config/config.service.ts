// src/config/config.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator'; // Import validateSync

class DbConfig {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsInt()
  @Min(1)
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USER: string;

  @IsString()
  @IsNotEmpty()
  DB_PASS: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;
}

class EnvConfig {
  @IsInt()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string;

  @IsString()
  @IsNotEmpty()
  ENCRYPTION_KEY: string;

  customerDbConfig: DbConfig;
  driverDbConfig: DbConfig;
  generalDbConfig: DbConfig;
}

@Injectable()
export class ConfigServiceExtended {
  constructor(private configService: ConfigService) {}

  private validateEnvConfig(): EnvConfig {
    // Mapping the environment variables to the class instance
    const envConfig = plainToClass(EnvConfig, {
      PORT: +this.configService.get('PORT'),
      JWT_SECRET: this.configService.get('JWT_SECRET'),
      ENCRYPTION_KEY: this.configService.get('ENCRYPTION_KEY'),

      customerDbConfig: {
        DB_HOST: this.configService.get('CUSTOMER_DB_HOST'),
        DB_PORT: +this.configService.get('CUSTOMER_DB_PORT'),
        DB_USER: this.configService.get('CUSTOMER_DB_USER'),
        DB_PASS: this.configService.get('CUSTOMER_DB_PASS'),
        DB_NAME: this.configService.get('CUSTOMER_DB_NAME'),
      },

      driverDbConfig: {
        DB_HOST: this.configService.get('DRIVER_DB_HOST'),
        DB_PORT: +this.configService.get('DRIVER_DB_PORT'),
        DB_USER: this.configService.get('DRIVER_DB_USER'),
        DB_PASS: this.configService.get('DRIVER_DB_PASS'),
        DB_NAME: this.configService.get('DRIVER_DB_NAME'),
      },

      generalDbConfig: {
        DB_HOST: this.configService.get('DB_HOST'),
        DB_PORT: +this.configService.get('DB_PORT'),
        DB_USER: this.configService.get('DB_USER'),
        DB_PASS: this.configService.get('DB_PASS'),
        DB_NAME: this.configService.get('DB_NAME'),
      },
    });

    // Validate the class instance
    const errors = validateSync(envConfig); // Validate the instance
    if (errors.length > 0) {
      const errorMessages = errors.map((error) => {
        const constraints = Object.values(error.constraints).join(', ');
        return `${error.property} failed validation: ${constraints}`;
      });
      throw new Error(
        `Configuration validation error: \n${errorMessages.join('\n')}`,
      );
    }

    return envConfig;
  }

  load() {
    return this.validateEnvConfig();
  }
}
