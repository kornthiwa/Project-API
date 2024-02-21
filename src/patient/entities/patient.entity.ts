import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Document & Patient;

@Schema({ timestamps: true })
export class Patient {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  age: number;

  @Prop({ type: String, required: true })
  symptoms: string;

  @Prop({ type: String, required: false })
  treatment: string;

  @Prop({ type: [String], required: false })
  medicalHistory: string[];

  @Prop({ type: String, required: false })
  address: string;

  @Prop({ type: String, required: false })
  phoneNumber: string;

  @Prop({ type: String, required: false })
  emergencyContact: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
