import { Module } from '@nestjs/common';
import { InMemoryDbService } from './service/in-memory-db/in-memory-db.service';
import { UuidService } from './service/uuid/uuid.service';

@Module({
  providers: [InMemoryDbService, UuidService],
  exports: [InMemoryDbService, UuidService],
})
export class SharedModule {}
