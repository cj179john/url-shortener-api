import { Injectable } from '@nestjs/common';
import { UtilsServiceImpl } from '../../commons/utils.service';
import { Url } from '../../interfaces/url';
import { UrlInboundDto } from '../../interfaces/UrlDto';
import { DataAccessImpl } from './dataAccess.service';

export interface UrlService {
  add(dto: UrlInboundDto): Promise<Url>;
}
@Injectable()
export class UrlServiceImpl implements UrlService {
  constructor(
    private readonly dataAccessService: DataAccessImpl,
    private readonly utils: UtilsServiceImpl,
  ) {}

  public async add({ url }: UrlInboundDto) {
    const urlCode = this.utils.getUniqueHarsh();
    return await this.dataAccessService.addOne(urlCode, url);
  }
}
