import { Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { QueueController } from './queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Queue, QueueSchema } from './entities/queue.entity';
import { PatientModule } from 'src/patient/patient.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Queue.name, schema: QueueSchema }]),
    PatientModule,
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
