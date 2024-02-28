import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
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

  @Get('next')
  async callNextQueue(): Promise<Queue | null> {
    return await this.queueService.callNextQueue();
  }

  @Get(':queueNumber')
  async recallQueue(
    @Param('queueNumber') queueNumber: number,
  ): Promise<Queue | null> {
    return await this.queueService.reCallQueue(queueNumber);
  }

  @Get()
  async allQueues(): Promise<Queue[]> {
    try {
      const queues = await this.queueService.findAll();
      return queues;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'เกิดข้อผิดพลาดในการดึงข้อมูลคิว',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(AuthGuard)
  @Post()
  async enqueue(@Body() createQueueDto: CreateQueueDto): Promise<Queue> {
    try {
      const lastQueue = await this.queueService.findLastQueue();
      let queueNumber = 1;
      if (lastQueue && lastQueue.queuedAt.getDate() === new Date().getDate()) {
        queueNumber = lastQueue.queueNumber + 1;
      }
      const queue = await this.queueService.create({
        ...createQueueDto,
        queueNumber,
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
