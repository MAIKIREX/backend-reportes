import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHistoricalDataDto } from './dto/create-historical-data.dto';
import { UpdateHistoricalDataDto } from './dto/update-historical-data.dto';
import { HistoricalData } from './entities/historical-data.entity';

@Injectable()
export class HistoricalDataService {
  constructor(
    @InjectRepository(HistoricalData)
    private readonly historicalDataRepository: Repository<HistoricalData>,
  ) {}

  async create(createHistoricalDataDto: CreateHistoricalDataDto) {
    try {
      const record = this.historicalDataRepository.create(createHistoricalDataDto);
      return await this.historicalDataRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating historical data');
    }
  }

  async findAll() {
    return this.historicalDataRepository.find({
      order: { submittedDate: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.historicalDataRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Historical data with id ${id} not found`);
    }

    return record;
  }

  async update(id: string, updateHistoricalDataDto: UpdateHistoricalDataDto) {
    try {
      const record = await this.findOne(id);
      const updated = this.historicalDataRepository.merge(
        record,
        updateHistoricalDataDto,
      );
      return await this.historicalDataRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating historical data');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.historicalDataRepository.delete(id);
      return { message: 'Historical data deleted' };
    } catch {
      throw new BadRequestException('Error deleting historical data');
    }
  }
}
