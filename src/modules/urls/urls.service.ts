import { Injectable } from '@nestjs/common';
import { Url } from '../../interfaces/url';
import { UrlInboundDto } from '../../interfaces/UrlDto';
import { DataAccessImpl } from './dataAccess.service';

export interface UrlService {
  add(dto: UrlInboundDto): Promise<Url>;
}
@Injectable()
export class UrlServiceImpl implements UrlService {
  constructor(private readonly dataAccessService: DataAccessImpl) {}

  public async add(dto: UrlInboundDto) {
    const shortForm = 'test';
    return await this.dataAccessService.addOne(shortForm, dto.url);
  }
}
