import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginDocument = Document & Login;

@Schema({ timestamps: true })
export class Login {
  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: Boolean, required: false })
  rememberMe?: boolean;
}

export const LoginSchema = SchemaFactory.createForClass(Login);
