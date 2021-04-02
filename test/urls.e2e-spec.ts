import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import MongoClient from 'mongodb';
import request from 'supertest';
import { testConfigs } from '../src/configs/index';
import DataModule from '../src/modules/db.module';
import { UrlsModule } from '../src/modules/urls/urls.module';

describe('UrlsController (e2e)', () => {
  let app: INestApplication;
  let connection: MongoClient.MongoClient;
  let db: MongoClient.Db;
  let urls: MongoClient.Collection;

  const mockData = { url: 'http://test.com', urlCode: '9kmin6ou' };

  beforeAll(async () => {
    connection = await MongoClient.connect(
      `mongodb://${testConfigs.mongoUrl}:${testConfigs.mongoPort}`,
      { useNewUrlParser: true },
    );
    db = connection.db(testConfigs.mongoDB);

    urls = db.collection('urls');

    await urls.insertOne(mockData);
  });

  afterAll(async () => {
    await urls.deleteMany({});
    await connection.close();
  });

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlsModule, DataModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Get', () => {
    it('should get single url', () => {
      // Act & Assert
      return request(app.getHttpServer())
        .get(`/urls`)
        .query({ urlCode: mockData.urlCode })
        .expect(200)
        .expect({ urlCode: mockData.urlCode, url: mockData.url });
    });

    //it('should throw 404 if url not found', () => {
    //  // Act & Assert
    //  return request(app.getHttpServer())
    //    .get('/urls')
    //    .query({ urlCode: 'non-exists' })
    //    .expect(404)
    //    .expect({ statusCode: 404, message: 'Not Found' });
    //});
  });

  //describe('Post', () => {
  //  it('should create a single url', () => {
  //    // Assign
  //    findOneMock.mockResolvedValue(mockData);

  //    // Act & Assert
  //    return request(app.getHttpServer())
  //      .post('/urls')
  //      .send(mockData)
  //      .expect(200);
  //  });
  //});
});
