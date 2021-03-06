import {
  Entity,
  Index,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

@Entity()
@Index({ name: 'urlCode_index', properties: ['urlCode'] })
export class MongoUrl {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property()
  urlCode: string;

  @Property()
  url: string;

  constructor(code: string, url: string) {
    this.urlCode = code;
    this.url = url;
  }
}
