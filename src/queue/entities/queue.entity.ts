import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Patient } from 'src/patient/entities/patient.entity';

export type QueueDocument = Document & Queue;

@Schema({ timestamps: true })
export class Queue {
  // ข้อมูลผู้ป่วย
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
  })
  patient: Patient;

  // สถานะคิว
  @Prop({ type: String, required: false })
  status: string;

  // เวลาที่เข้าคิว
  @Prop({ type: Date, required: false })
  queuedAt: Date;

  // เวลาที่คาดว่าจะได้เข้ารับการรักษา
  @Prop({ type: Date, required: false })
  estimatedTreatmentTime: Date;

  // เวลาที่เข้ารับการรักษา
  @Prop({ type: Date, required: false })
  startedTreatmentAt: Date;

  // เวลาที่เสร็จสิ้นการรักษา
  @Prop({ type: Date, required: false })
  finishedTreatmentAt: Date;

  // หมายเลขคิว
  @Prop({ type: Number, required: false })
  queueNumber: number;
}

export const QueueSchema = SchemaFactory.createForClass(Queue);
