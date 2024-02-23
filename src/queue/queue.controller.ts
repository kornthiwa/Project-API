import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { QueueService } from './queue.service';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';
import { PatientService } from 'src/patient/patient.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService,
    private readonly patientService: PatientService,
  ) {}

  @UseGuards(AuthGuard)
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
      const queue = await this.queueService.create({
        ...createQueueDto,
        queueNumber,
        patient,
        status: 'Pending',
        queuedAt: new Date(),
      });

      return queue;
    } catch (error) {
      console.error('Error enqueuing queue:', error);
      throw new HttpException(
        { message: 'Failed to retrieve queue' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
