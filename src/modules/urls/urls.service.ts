import { Injectable } from '@nestjs/common';
import { UtilsServiceImpl } from '../../commons/utils.service';
import { Url } from '../../interfaces/url';
import { UrlDto } from '../../interfaces/UrlDto';
import { DataAccessImpl } from './dataAccess.service';

export interface UrlService {
  add(dto: UrlDto): Promise<Url>;
  findByCode(code: string): Promise<Url>;
}
@Injectable()
export class UrlServiceImpl implements UrlService {
  constructor(
    private readonly dataAccessService: DataAccessImpl,
    private readonly utils: UtilsServiceImpl,
  ) {}

  public async add({ url }: UrlDto) {
    const urlCode = this.utils.getUniqueHarsh();
    return await this.dataAccessService.addOne(urlCode, url);
  }

  public async findByCode(urlCode: string) {
    return await this.dataAccessService.findOne(urlCode);
  }
}
