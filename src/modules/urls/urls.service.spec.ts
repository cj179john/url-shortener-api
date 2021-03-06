import { Test } from '@nestjs/testing';
import { UtilsServiceImpl } from '../../commons/utils.service';
import { DataAccessImpl } from './dataAccess.service';
import { UrlService, UrlServiceImpl } from './urls.service';

describe('Url Service', () => {
  let urlService: UrlService;
  let dataAccess: DataAccessImpl;
  let utils: UtilsServiceImpl;

  const returnedHash = 'o242zd5x';
  const mockDataAccess = jest.fn(() => ({
    addOne: jest.fn(),
    findOne: jest.fn(),
  }));

  const mockUtils = jest.fn(() => ({
    getUniqueHarsh: jest.fn().mockReturnValue(returnedHash),
  }));

  const url = 'http://my-test.com';

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UrlServiceImpl,
        {
          provide: UtilsServiceImpl,
          useFactory: mockUtils,
        },
        {
          provide: DataAccessImpl,
          useFactory: mockDataAccess,
        },
      ],
    }).compile();

    urlService = module.get<UrlServiceImpl>(UrlServiceImpl);
    dataAccess = module.get<DataAccessImpl>(DataAccessImpl);
    utils = module.get<UtilsServiceImpl>(UtilsServiceImpl);
  });

  it('should add one record', async () => {
    // Assign
    const fixture = { url };

    // Act
    await urlService.add(fixture);

    // Assert
    expect(utils.getUniqueHarsh).toBeCalled();
    expect(dataAccess.addOne).toBeCalledWith(returnedHash, fixture.url);
  });

  it('should get one record', async () => {
    // Assign
    const fixture = 'test-code';
    const expected = { url };

    (dataAccess.findOne as jest.Mock).mockResolvedValue(expected);

    // Act
    const result = await urlService.findByCode(fixture);

    // Assert
    expect(dataAccess.findOne).toBeCalledWith(fixture);
    expect(result).toEqual(expected);
  });
});
