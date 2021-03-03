import { EntityManager } from '@mikro-orm/mongodb';
import { UseRequestContext } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UrlInboundDto } from '../interfaces/UrlDto';
import { MongoUrl } from 'src/entities/Url';

export interface UrlService {
  add(dto: UrlInboundDto): Promise<unknown>;
}
@Injectable()
export class UrlServiceImpl implements UrlService {
  constructor(private readonly em: EntityManager) {}

  @UseRequestContext()
  public async add(dto: UrlInboundDto) {
    const shortForm = '';
    const newUrl = new MongoUrl(shortForm, dto.url);
    return await this.em.persistAndFlush(newUrl);
  }
}
