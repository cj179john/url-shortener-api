import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import DataModule from './modules/db.module';
import { UrlsModule } from './modules/urls/urls.module';

@Module({
  imports: [UrlsModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
