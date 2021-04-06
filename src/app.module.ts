import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ConfigModule from './modules/config/config.module';
import DataModule from './modules/db.module';
import { UrlsModule } from './modules/urls/urls.module';

@Module({
  imports: [UrlsModule, DataModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
