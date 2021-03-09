import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { DataAccessImpl } from '../src/modules/urls/dataAccess.service';
import { UrlsModule } from '../src/modules/urls/urls.module';

describe('UrlsController (e2e)', () => {
  let app: INestApplication;
  const findOneMock: jest.Mock = jest.fn();
  const addOneMock: jest.Mock = jest.fn();

  const mockData = { url: 'http://test.com', urlCode: '9kmin6ou' };
  const mockDataAccess = {
    addOne: addOneMock,
    findOne: findOneMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UrlsModule],
    })
      .overrideProvider(DataAccessImpl)
      .useValue(mockDataAccess)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Get', () => {
    it('should get single url', () => {
      // Assign
      findOneMock.mockResolvedValue(mockData);

      // Act & Assert
      return request(app.getHttpServer())
        .get(`/urls`)
        .query({ urlCode: mockData.urlCode })
        .expect(200)
        .expect({ url: mockData.url });
    });

    it('should throw 404 if url not found', () => {
      // Assign
      findOneMock.mockResolvedValue(undefined);

      // Act & Assert
      return request(app.getHttpServer())
        .get('/urls')
        .query({ urlCode: 'non-exists' })
        .expect(404)
        .expect({ statusCode: 404, message: 'Not Found' });
    });
  });

  describe('Post', () => {
    it('should create a single url', () => {
      // Assign
      findOneMock.mockResolvedValue(mockData);

      // Act & Assert
      return request(app.getHttpServer())
        .post('/urls')
        .send(mockData)
        .expect(200);
    });
  });
});
