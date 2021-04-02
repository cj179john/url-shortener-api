import { MikroOrmModule } from '@mikro-orm/nestjs';
import configs from '../configs';

const DataModule = MikroOrmModule.forRoot({
  entities: ['../../dist/entities'],
  entitiesTs: ['../entities'],
  type: 'mongo',
  baseDir: __dirname,
  clientUrl: `mongodb://${configs.mongoUrl}:${configs.mongoPort}/${configs.mongoDB}`,
});

export default DataModule;
