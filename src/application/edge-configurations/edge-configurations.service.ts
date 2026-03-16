import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEdgeConfigurationDto } from './dto/create-edge-configuration.dto';
import { UpdateEdgeConfigurationDto } from './dto/update-edge-configuration.dto';
import { EdgeConfiguration } from './entities/edge-configuration.entity';

@Injectable()
export class EdgeConfigurationsService {
  constructor(
    @InjectRepository(EdgeConfiguration)
    private readonly edgeConfigurationRepository: Repository<EdgeConfiguration>,
  ) {}

  async create(createEdgeConfigurationDto: CreateEdgeConfigurationDto) {
    try {
      const record = this.edgeConfigurationRepository.create(
        createEdgeConfigurationDto,
      );
      return await this.edgeConfigurationRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating edge configuration');
    }
  }

  async findAll() {
    return this.edgeConfigurationRepository.find({
      order: { startDate: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.edgeConfigurationRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(`Edge configuration with id ${id} not found`);
    }

    return record;
  }

  async update(id: string, updateEdgeConfigurationDto: UpdateEdgeConfigurationDto) {
    try {
      const record = await this.findOne(id);
      const updated = this.edgeConfigurationRepository.merge(
        record,
        updateEdgeConfigurationDto,
      );
      return await this.edgeConfigurationRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating edge configuration');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.edgeConfigurationRepository.delete(id);
      return { message: 'Edge configuration deleted' };
    } catch {
      throw new BadRequestException('Error deleting edge configuration');
    }
  }
}
