import { Controller, Get } from '@nestjs/common';
import { UrlDto } from '../interfaces/url';

@Controller('urls')
export class UrlsController {
  @Get()
  findAll(): UrlDto[] {
    return [];
  }
}
