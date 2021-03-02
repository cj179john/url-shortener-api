import { ObjectId } from '@mikro-orm/mongodb';
import {
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';

@Entity()
export class MongoUrl {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property()
  shortForm: string;

  @Property()
  originalForm: string;

  constructor(short: string, original: string) {
    this.shortForm = short;
    this.originalForm = original;
  }
}
