import { Controller, Post, Body } from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';
import { PatientService } from 'src/patient/patient.service';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly patientService: PatientService,
  ) {}

  @Post()
  async enqueue(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    try {
      const lastQueue = await this.queueService.findLastQueue();
      let queueNumber = 1;
      const patient = await this.patientService.findOne(
        createQueueDto.patientId,
      );
      if (lastQueue && lastQueue.queuedAt.getDate() === new Date().getDate()) {
        queueNumber = lastQueue.queueNumber + 1;
      }
      console.log(patient);

      const queue = await this.queueService.create({
        ...createQueueDto,
        queueNumber,
        patient,
        status: 'Pending',
        queuedAt: new Date(),
      });

      return queue;
    } catch (error) {
      console.error('Error enqueuing patient:', error);
      throw new Error('Failed to enqueue patient');
    }
  }
}
