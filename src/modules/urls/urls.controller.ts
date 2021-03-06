import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlDto } from '../../interfaces/urlDto';
import { UrlServiceImpl } from '../../modules/urls/urls.service';

export interface UrlParams {
  urlCode: string;
}
@Controller('urls')
export class UrlsController {
  constructor(private readonly service: UrlServiceImpl) {}

  @Get()
  public async find(@Param() params: UrlParams): Promise<UrlDto> {
    const { urlCode } = params;
    const { url } = await this.service.findByCode(urlCode);
    return { url, urlCode };
  }

  @Post()
  async addOne(@Body() body: UrlDto): Promise<UrlDto> {
    const result = await this.service.add(body);
    return { urlCode: result.urlCode };
  }
}
