import { Module } from '@nestjs/common';
import { UtilsServiceImpl } from '../../commons/utils.service';
import { DataAccessImpl } from './dataAccess.service';
import { UrlsController } from './urls.controller';
import { UrlServiceImpl } from './urls.service';

@Module({
  controllers: [UrlsController],
  providers: [UrlServiceImpl, DataAccessImpl, UtilsServiceImpl],
})
export class UrlsModule {}
