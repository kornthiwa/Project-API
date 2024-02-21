import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsString()
  @IsNotEmpty()
  readonly symptoms: string;

  readonly treatment?: string;

  readonly medicalHistory?: string[];

  readonly address?: string;

  readonly phoneNumber?: string;

  readonly emergencyContact?: string;
}
