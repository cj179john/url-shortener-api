import { ConfigService } from '@nestjs/config';
import MongoClient from 'mongodb';

export interface FixtureService<T> {
  create: (
    data: T[],
  ) => Promise<MongoClient.InsertOneWriteOpResult<MongoClient.WithId<T>>[]>;
  initialise: (collectionName: string) => Promise<void>;
  emptyCollection: () => Promise<MongoClient.DeleteWriteOpResultObject>;
  closeConnection: () => Promise<void>;
}

export class FixtureServiceImpl<T> implements FixtureService<T> {
  private collection: MongoClient.Collection<T>;
  private connection: MongoClient.MongoClient;

  constructor(private readonly configService: ConfigService) {}

  public async create(data: T[]) {
    const promises = data.map(async (dto: T) => {
      return this.collection.insertOne(dto as MongoClient.OptionalId<T>);
    });
    return await Promise.all(promises);
  }

  public async emptyCollection() {
    return this.collection.deleteMany({});
  }

  public async closeConnection() {
    return await this.connection.close();
  }

  public async initialise(collectionName: string) {
    this.connection = await MongoClient.connect(
      `mongodb://${this.configService.get<string>(
        'database.host',
      )}:${this.configService.get<number>('database.port')}`,
      { useNewUrlParser: true },
    );
    const db = this.connection.db(this.configService.get('database.db'));

    this.collection = db.collection(collectionName);
  }
}
