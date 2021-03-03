import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlDto } from '../interfaces/url';
import { UrlInboundDto, UrlOutboundDto } from '../interfaces/UrlDto';

@Controller('urls')
export class UrlsController {
  @Get()
  findAll(): UrlDto[] {
    return [];
  }

  @Post()
  addOne(@Body() body: UrlInboundDto): UrlOutboundDto {
    return {} as UrlOutboundDto;
  }
}
