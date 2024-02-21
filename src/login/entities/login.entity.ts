import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  NURSE = 'nurse',
  DOCTOR = 'doctor',
}

export type LoginDocument = Document & Login;

@Schema({ timestamps: true })
export class Login {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lname: string;

  @Prop({ type: Boolean, required: false, default: true })
  rememberMe?: boolean;

  @Prop({ type: String, required: true, enum: UserRole })
  role: UserRole;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
