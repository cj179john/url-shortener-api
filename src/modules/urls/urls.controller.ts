import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlDto } from '../../interfaces/url';
import { UrlInboundDto, UrlOutboundDto } from '../../interfaces/UrlDto';
import { UrlServiceImpl } from '../../modules/urls/urls.service';

@Controller('urls')
export class UrlsController {
  constructor(private readonly service: UrlServiceImpl) {}

  @Get()
  public async find(): Promise<UrlDto> {
    return {} as UrlDto;
  }

  @Post()
  async addOne(@Body() body: UrlInboundDto): Promise<UrlOutboundDto> {
    const result = await this.service.add(body);
    return { urlCode: result.urlCode };
  }
}
