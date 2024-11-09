import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidService {
  generate(): string {
    return crypto.randomUUID();
  }

  validate(id: string): boolean {
    return (
      typeof id === 'string' &&
      new RegExp(
        '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$',
      ).test(id)
    );
  }
}
