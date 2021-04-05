import { MikroOrmModule } from '@mikro-orm/nestjs';
import configuration from './config/configuration';

const configs = configuration()['database'];
console.log('configs', configs);

const DataModule = MikroOrmModule.forRoot({
  entities: ['../../dist/entities'],
  entitiesTs: ['../entities'],
  type: 'mongo',
  baseDir: __dirname,
  autoLoadEntities: true,
  clientUrl: `mongodb://${configs['host']}:${configs['port']}/${configs['db']}`,
});

export default DataModule;
