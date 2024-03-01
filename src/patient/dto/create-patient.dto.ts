import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  readonly age: number;

  @IsString()
  readonly symptoms: string;

  @IsString()
  readonly treatment?: string;

  @IsString()
  readonly medicalHistory?: string[];

  @IsString()
  readonly address?: string;

  @IsString()
  readonly phoneNumber?: string;

  @IsString()
  readonly emergencyContact?: string;

  @IsString()
  readonly status?: string;
}
