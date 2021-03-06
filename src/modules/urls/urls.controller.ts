import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { UrlDto } from '../../interfaces/urlDto';
import { UrlServiceImpl } from '../../modules/urls/urls.service';

export interface UrlParams {
  urlCode: string;
}
@Controller('urls')
export class UrlsController {
  constructor(private readonly service: UrlServiceImpl) {}

  @Get()
  public async find(@Query('urlCode') urlCode: string): Promise<UrlDto> {
    const result = await this.service.findByCode(urlCode);

    if (!result) {
      throw new NotFoundException();
    }

    return { url: result.url, urlCode };
  }

  @Post()
  async addOne(@Body() body: UrlDto): Promise<UrlDto> {
    const result = await this.service.add(body);
    return { urlCode: result.urlCode };
  }
}
