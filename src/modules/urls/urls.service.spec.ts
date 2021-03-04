import { Test } from '@nestjs/testing';
import { DataAccessImpl } from './dataAccess.service';
import { UrlService, UrlServiceImpl } from './urls.service';

describe('Url Service', () => {
  let urlService: UrlService;
  let dataAccess: DataAccessImpl;

  const mockDataAccess = jest.fn(() => ({
    addOne: jest.fn(),
  }));

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UrlServiceImpl,
        {
          provide: DataAccessImpl,
          useFactory: mockDataAccess,
        },
      ],
    }).compile();

    urlService = module.get<UrlServiceImpl>(UrlServiceImpl);
    dataAccess = module.get<DataAccessImpl>(DataAccessImpl);
  });

  it('should add one record', async () => {
    // Assign
    const fixture = { url: 'http://my-test.com' };

    // Act
    await urlService.add(fixture);

    // Assert
    expect(dataAccess.addOne).toBeCalledWith('test', fixture.url);
  });
});
