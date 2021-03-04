import { EntityManager } from '@mikro-orm/mongodb';
import { Injectable } from '@nestjs/common';
import { MongoUrl } from '../../entities/Url';

export interface DataAccess {
  addOne(shortForm: string, originalForm: string): Promise<MongoUrl>;
}
@Injectable()
export class DataAccessImpl implements DataAccess {
  constructor(private readonly em: EntityManager) {}

  public async addOne(shortForm: string, originalForm: string) {
    const newUrl = new MongoUrl(shortForm, originalForm);
    await this.em.persistAndFlush(newUrl);
    return newUrl;
  }
}
