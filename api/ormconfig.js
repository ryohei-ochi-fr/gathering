/*
[【NestJS】TypeORMのMigrationを実装する - Qiita](https://qiita.com/suzuki0430/items/f7b6c45cf0fdcf0b6ab3)

npm run typeorm migration:generate -- -n initial-schema -o
npm run typeorm migration:run
*/


var dbConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
      migrationsDir: 'migrations',
    },
  };
  
  switch (process.env.NODE_ENV) {
    case 'development':
      module.exports = Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'data/dev.calender.db',
        entities: ['**/*.entity.js'],
      });
      break;
    case 'test':
      module.exports = Object.assign(dbConfig, {
        type: 'sqlite',
        database: 'data/test.calender.db',
        entities: ['**/*.entity.ts'],
        migrationsRun: true,
      });
      break;
    case 'production':
      module.exports = Object.assign(dbConfig, {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        migrationsRun: true,
        entities: ['**/*.entity.js'],
        ssl: {
          rejectUnauthorized: false,
        },
      });
      break;
    default:
      throw new Error('unknown error');
  }