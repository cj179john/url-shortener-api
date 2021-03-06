import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { MongoUrl } from '../../entities/Url';

export interface DataAccess {
  addOne(urlCode: string, url: string): Promise<MongoUrl>;
}
@Injectable()
export class DataAccessImpl implements DataAccess {
  constructor(private readonly em: EntityManager) {}

  public async addOne(urlCode: string, url: string) {
    const newUrl = new MongoUrl(urlCode, url);
    await this.em.persistAndFlush(newUrl);
    return newUrl;
  }
}
