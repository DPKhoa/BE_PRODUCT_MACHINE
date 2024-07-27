/* eslint-disable prettier/prettier */

import { SqlServerConnectionOptions } from 'typeorm/driver/sqlserver/SqlServerConnectionOptions';
// import { DataSource } from "typeorm"

const config: SqlServerConnectionOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: '123',
  database: 'test_demo',
  // entities: ['dist/**/*.entity{.ts,.js}'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  extra: {
    trustServerCertificate: true,
  },
};

export default config;
