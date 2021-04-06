import { ConfigModule } from '@nestjs/config';
import configuration from './configuration';

export default ConfigModule.forRoot({
  ignoreEnvFile: true,
  load: [configuration],
  isGlobal: true,
});
