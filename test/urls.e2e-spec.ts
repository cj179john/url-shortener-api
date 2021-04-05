import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { MongoUrl } from '../src/entities/Url';
import ConfigModule from '../src/modules/config/config.module';
import DataModule from '../src/modules/db.module';
import { UrlsModule } from '../src/modules/urls/urls.module';
import { FixtureServiceImpl } from './config/FixtureService';

describe('UrlsController (e2e)', () => {
  let app: INestApplication;
  let server: unknown;
  let fixtureService: FixtureServiceImpl<MongoUrl>;

  const mockData = new MongoUrl('http://test.com', '9kmin6ou');

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlsModule, DataModule, ConfigModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const configService = app.get(ConfigService);

    fixtureService = new FixtureServiceImpl<MongoUrl>(configService);
    await fixtureService.initialise('urls');
    await fixtureService.create([mockData]);

    server = app.getHttpServer();
  });

  afterEach(async () => {
    await fixtureService.emptyCollection();
    await fixtureService.closeConnection();
  });

  describe('Get', () => {
    it('should get single url', () => {
      // Act & Assert
      return request(server)
        .get(`/urls`)
        .query({ urlCode: mockData.urlCode })
        .expect(200)
        .expect({ urlCode: mockData.urlCode, url: mockData.url });
    });

    it('should throw 404 if url not found', () => {
      // Act & Assert
      return request(app.getHttpServer())
        .get('/urls')
        .query({ urlCode: 'non-exists' })
        .expect(404)
        .expect({ statusCode: 404, message: 'Not Found' });
    });
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
