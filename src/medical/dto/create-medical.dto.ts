import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export class CreateMedicalDto {
  // ผู้ป่วยที่เกี่ยวข้องกับประวัติการรักษา
  @IsNotEmpty()
  @IsString()
  patientID: string;

  // หมอที่รับผิดชอบการรักษา
  @IsNotEmpty()
  @IsString()
  doctorID: string;

  @IsObject()
  readonly patient: Patient;

  @IsObject()
  readonly doctor: Doctor;

  // รายละเอียดของการรักษา
  @IsNotEmpty()
  @IsString()
  treatmentDetails: string;

  // วันที่รับการรักษา
  @IsOptional()
  treatmentDate?: Date;

  // ผลการตรวจวินิจฉัย
  @IsNotEmpty()
  @IsString()
  diagnosis: string;
}
