import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { Patient } from 'src/patient/entities/patient.entity';

export class CreateQueueDto {
  // ข้อมูลผู้ป่วย
  @IsString()
  @IsNotEmpty()
  readonly patientId: string;

  @IsObject()
  readonly patient: Patient;

  // สถานะคิว
  @IsString()
  @IsOptional()
  readonly status?: string;

  // เวลาที่เข้าคิว
  @IsOptional()
  readonly queuedAt?: Date;

  // เวลาที่คาดว่าจะได้เข้ารับการรักษา
  @IsOptional()
  readonly estimatedTreatmentTime?: Date;

  // หมายเลขคิว
  @IsNumber()
  @IsNotEmpty()
  readonly queueNumber: number;
}
