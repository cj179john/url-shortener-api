import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UrlsModule } from './urls/urls.module';
import DataModule from './db.module';

@Module({
  imports: [UrlsModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
