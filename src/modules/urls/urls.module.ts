import { Module } from '@nestjs/common';
import { DataAccessImpl } from './dataAccess.service';
import { UrlsController } from './urls.controller';
import { UrlServiceImpl } from './urls.service';

@Module({
  controllers: [UrlsController],
  providers: [UrlServiceImpl, DataAccessImpl],
})
export class UrlsModule {}
