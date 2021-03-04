import { Injectable } from '@nestjs/common';

export interface UtilsService {
  getUniqueHarsh(length: number): string;
}

@Injectable()
export class UtilsServiceImpl implements UtilsService {
  public getUniqueHarsh(length = 8): string {
    return (Math.random().toString(36) + '00000000000000000').slice(
      2,
      length + 2,
    );
  }
}
