declare namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASS: string;
      DB_NAME: string;
      CUSTOMER_DB_HOST: string;
      CUSTOMER_DB_PORT: string;
      CUSTOMER_DB_USER: string;
      CUSTOMER_DB_PASS: string;
      CUSTOMER_DB_NAME: string;
      DRIVER_DB_HOST: string;
      DRIVER_DB_PORT: string;
      DRIVER_DB_USER: string;
      DRIVER_DB_PASS: string;
      DRIVER_DB_NAME: string;
      PORT: string;
      JWT_SECRET: string;
      ENCRYPTION_KEY: string;
    }
  }