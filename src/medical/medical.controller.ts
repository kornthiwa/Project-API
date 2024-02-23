import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MedicalService } from './medical.service';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { PatientService } from 'src/patient/patient.service';
import { DoctorService } from 'src/doctor/doctor.service';

@Controller('medical')
export class MedicalController {
  constructor(
    private readonly medicalService: MedicalService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  @Post()
  async create(@Body() createMedicalDto: CreateMedicalDto) {
    console.log(createMedicalDto);
    const patient = await this.patientService.findOne(
      createMedicalDto.patientID,
    );
    const doctor = await this.doctorService.findOne(createMedicalDto.doctorID);

    if (!patient) {
      throw new HttpException('Patient not found', HttpStatus.NOT_FOUND);
    }

    if (!doctor) {
      throw new HttpException('Doctor not found', HttpStatus.NOT_FOUND);
    }

    return await this.medicalService.create({
      ...createMedicalDto,
      patient,
      doctor,
    });
  }

  @Get()
  async findAll() {
    return await this.medicalService.findAll();
  }

  @Get('/search')
  async findOne(
    @Query('patient') patientID?: string,
    @Query('doctor') doctorID?: string,
  ) {
    return await this.medicalService.findOne(patientID, doctorID);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.medicalService.remove(id);
  }
}
