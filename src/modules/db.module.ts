import { MikroOrmModule } from '@mikro-orm/nestjs';
import configuration from './config/configuration';

// @TODO, this can be done more natively within the DI scope of NestJS
const configs = configuration()['database'];

const DataModule = MikroOrmModule.forRoot({
  entities: ['../../dist/entities'],
  entitiesTs: ['../entities'],
  type: 'mongo',
  baseDir: __dirname,
  autoLoadEntities: true,
  clientUrl: `mongodb://${configs['host']}:${configs['port']}/${configs['db']}`,
});

export default DataModule;
