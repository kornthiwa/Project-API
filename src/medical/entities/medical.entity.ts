import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Patient } from 'src/patient/entities/patient.entity';

export type MedicalRecordDocument = Document & MedicalRecord;

@Schema({ timestamps: true })
export class MedicalRecord {
  // ผู้ป่วยที่เกี่ยวข้องกับประวัติการรักษา
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true,
  })
  patient: Patient;

  // หมอที่รับผิดชอบการรักษา
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true,
  })
  doctor: Doctor;

  // รายละเอียดของการรักษา
  @Prop({ type: String, required: true })
  treatmentDetails: string;

  // วันที่รับการรักษา
  @Prop({ type: Date, required: true })
  treatmentDate: Date;

  // ผลการตรวจวินิจฉัย
  @Prop({ type: String, required: true })
  diagnosis: string;
}

export const MedicalRecordSchema = SchemaFactory.createForClass(MedicalRecord);
