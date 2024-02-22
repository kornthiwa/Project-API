import { Injectable } from '@nestjs/common';
import { CreateQueueDto } from './dto/create-queue.dto';
import { Queue } from './entities/queue.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class QueueService {
  constructor(@InjectModel(Queue.name) private queueModel: Model<Queue>) {}

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    // Find the last queue
    const lastQueue = await this.findLastQueue();
    // Check if it's a new day
    const today = new Date().getDate();
    const lastQueueDay = lastQueue ? lastQueue.queuedAt.getDate() : null;

    // Initialize the queue number
    let queueNumber = 1;

    if (lastQueueDay !== today) {
      // If it's a new day, reset the queue number
      queueNumber = 1;
    } else {
      // If it's the same day, increment the queue number
      queueNumber = lastQueue.queueNumber + 1;
    }

    // Create a new queue
    const newQueue = new this.queueModel({
      ...createQueueDto,
      queueNumber,
      queuedAt: new Date(),
    });

    // Save the new queue
    return await newQueue.save();
  }

  async findLastQueue(): Promise<Queue | null> {
    return await this.queueModel.findOne().sort({ queuedAt: -1 }).exec();
  }
}
