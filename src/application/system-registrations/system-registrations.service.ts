import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSystemRegistrationDto } from './dto/create-system-registration.dto';
import { UpdateSystemRegistrationDto } from './dto/update-system-registration.dto';
import { SystemRegistration } from './entities/system-registration.entity';

@Injectable()
export class SystemRegistrationsService {
  constructor(
    @InjectRepository(SystemRegistration)
    private readonly systemRegistrationRepository: Repository<SystemRegistration>,
  ) {}

  async create(createSystemRegistrationDto: CreateSystemRegistrationDto) {
    try {
      const record = this.systemRegistrationRepository.create(
        createSystemRegistrationDto,
      );
      return await this.systemRegistrationRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating system registration');
    }
  }

  async findAll() {
    return this.systemRegistrationRepository.find({
      order: { entryDate: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.systemRegistrationRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `System registration with id ${id} not found`,
      );
    }

    return record;
  }

  async update(
    id: string,
    updateSystemRegistrationDto: UpdateSystemRegistrationDto,
  ) {
    try {
      const record = await this.findOne(id);
      const updated = this.systemRegistrationRepository.merge(
        record,
        updateSystemRegistrationDto,
      );
      return await this.systemRegistrationRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating system registration');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.systemRegistrationRepository.delete(id);
      return { message: 'System registration deleted' };
    } catch {
      throw new BadRequestException('Error deleting system registration');
    }
  }
}
