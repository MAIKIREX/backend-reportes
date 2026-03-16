import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyPerformance } from './entities/daily-performance.entity';
import { CreateDailyPerformanceDto } from './dto/create-daily-performance.dto';
import { UpdateDailyPerformanceDto } from './dto/update-daily-performance.dto';

@Injectable()
export class DailyPerformanceService {
  constructor(
    @InjectRepository(DailyPerformance)
    private readonly dailyPerformanceRepository: Repository<DailyPerformance>,
  ) {}

  async create(createDailyPerformanceDto: CreateDailyPerformanceDto) {
    try {
      const record = this.dailyPerformanceRepository.create(
        createDailyPerformanceDto,
      );
      return await this.dailyPerformanceRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating daily performance');
    }
  }

  async findAll() {
    return this.dailyPerformanceRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.dailyPerformanceRepository.findOne({ where: { id } });

    if (!record) {
      throw new NotFoundException(
        `Daily performance with id ${id} not found`,
      );
    }

    return record;
  }

  async update(id: string, updateDailyPerformanceDto: UpdateDailyPerformanceDto) {
    try {
      const record = await this.findOne(id);
      const updated = this.dailyPerformanceRepository.merge(
        record,
        updateDailyPerformanceDto,
      );
      return await this.dailyPerformanceRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating daily performance');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.dailyPerformanceRepository.delete(id);
      return { message: 'Daily performance deleted' };
    } catch {
      throw new BadRequestException('Error deleting daily performance');
    }
  }
}
