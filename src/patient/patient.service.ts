import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    // ตรวจสอบว่ามีผู้ป่วยที่มีชื่อเหมือนกันหรือไม่
    const existingPatient = await this.patientModel.findOne({
      name: createPatientDto.name,
    });

    // ถ้ามีผู้ป่วยที่มีชื่อเหมือนกันแล้ว ให้โยนข้อผิดพลาด
    if (existingPatient) {
      throw new Error('Patient with the same name already exists');
    }

    // ถ้าไม่มีผู้ป่วยที่มีชื่อเหมือนกัน สร้างผู้ป่วยใหม่
    const createdPatient = new this.patientModel(createPatientDto);
    return await createdPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientModel.find().exec();
  }

  async findOne(id: string): Promise<Patient | null> {
    return await this.patientModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient | null> {
    return await this.patientModel
      .findByIdAndUpdate(id, updatePatientDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Patient | null> {
    return await this.patientModel.findByIdAndDelete(id).exec();
  }
}
