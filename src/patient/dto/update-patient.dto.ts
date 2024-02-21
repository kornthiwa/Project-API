import { PartialType } from '@nestjs/mapped-types';
import { CreatePatientDto } from './create-patient.dto';

export class UpdatePatientDto extends PartialType(CreatePatientDto) {
  readonly name?: string;

  readonly priority?: number;
  readonly type?: string;
  readonly image?: {
    image: string;
    name: string;
  };

  readonly active: boolean;
  readonly status: number;
  readonly deletestatus: boolean;
}
