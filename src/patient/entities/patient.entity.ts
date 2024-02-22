import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Document & Patient;

@Schema({ timestamps: true })
export class Patient {
  //ชื่อของผู้ป่วย
  @Prop({ type: String, required: true })
  name: string;
  //อายุของผู้ป่วย
  @Prop({ type: Number, required: true })
  age: number;
  //อาการที่ผู้ป่วยมี
  @Prop({ type: String, required: true })
  symptoms: string;
  //การรักษาที่ผู้ป่วยได้รับ
  @Prop({ type: String, required: false })
  treatment: string;
  //ประวัติการรักษาทางการแพทย์ของผู้ป่วย
  @Prop({ type: [String], required: false })
  medicalHistory: string[];
  //ที่อยู่ของผู้ป่วย
  @Prop({ type: String, required: false })
  address: string;
  //เบอร์โทรศัพท์ของผู้ป่วย
  @Prop({ type: String, required: false })
  phoneNumber: string;
  //บุคคลที่ติดต่อได้ฉุกเฉิน
  @Prop({ type: String, required: false })
  emergencyContact: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
