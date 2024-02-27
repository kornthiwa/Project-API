import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
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

  // @IsObject()
  // readonly patient: Patient;

  // @IsObject()
  // readonly doctor: Doctor;

  // รายละเอียดของการรักษา
  @IsNotEmpty()
  @IsString()
  treatmentDetails: string;

  // ผลการตรวจวินิจฉัย
  @IsNotEmpty()
  @IsString()
  diagnosis: string;

  // อุณหภูมิร่างกาย
  @IsOptional()
  @IsNumber()
  bodyTemperature?: number;

  // สถานะการรักษา
  @IsOptional()
  @IsString()
  status?: string;

  // น้ำหนัก
  @IsOptional()
  @IsNumber()
  weight?: number;

  // ส่วนสูง
  @IsOptional()
  @IsNumber()
  height?: number;

  // ความดันโลหิต
  @IsOptional()
  @IsString()
  bloodPressure?: string;
}
