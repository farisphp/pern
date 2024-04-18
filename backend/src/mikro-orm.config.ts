import { Logger } from '@nestjs/common';
import { Options } from '@mikro-orm/core';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

const logger = new Logger('MikroORM');
const config = {
  driver: PostgreSqlDriver,
  dbName: process.env.DB_NAME || 'pern-stack',
  host: process.env.DB_HOST || 'postgres',
  user: process.env.DB_USER || 'postgres',
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || 'postgres',
  highlighter: new SqlHighlighter(),
  debug: true,
  logger: logger.log.bind(logger),
  entities: ['./dist/**/entities/*'],
  entitiesTs: ['./src/**/entities/*'],
  metadataProvider: TsMorphMetadataProvider,
  migrations: {
    tableName: 'mikro_orm_migrations', // name of database table with log of executed transactions
    path: './dist/src/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.(js|ts)$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: true, // allow to disable table and column dropping
    emit: 'ts', // migration generation mode
  },
  extensions: [Migrator],
} as Options;

export default config;
