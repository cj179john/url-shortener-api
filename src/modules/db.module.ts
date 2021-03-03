import { MikroOrmModule } from '@mikro-orm/nestjs';

const DataModule = MikroOrmModule.forRoot({
  entities: ['../../dist/entities'],
  entitiesTs: ['../entities'],
  dbName: 'urls',
  type: 'mongo',
  baseDir: __dirname,
});

export default DataModule;
