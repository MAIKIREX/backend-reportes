import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDailyPerformanceDto } from './dto/create-user-daily-performance.dto';
import { UpdateUserDailyPerformanceDto } from './dto/update-user-daily-performance.dto';
import { UserDailyPerformance } from './entities/user-daily-performance.entity';

@Injectable()
export class UserDailyPerformanceService {
  constructor(
    @InjectRepository(UserDailyPerformance)
    private readonly userDailyPerformanceRepository: Repository<UserDailyPerformance>,
  ) {}

  async create(createUserDailyPerformanceDto: CreateUserDailyPerformanceDto) {
    try {
      const record = this.userDailyPerformanceRepository.create(
        createUserDailyPerformanceDto,
      );
      return await this.userDailyPerformanceRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating user daily performance');
    }
  }

  async findAll() {
    return this.userDailyPerformanceRepository.find({
      order: { date: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.userDailyPerformanceRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `User daily performance with id ${id} not found`,
      );
    }

    return record;
  }

  async update(
    id: string,
    updateUserDailyPerformanceDto: UpdateUserDailyPerformanceDto,
  ) {
    try {
      const record = await this.findOne(id);
      const updated = this.userDailyPerformanceRepository.merge(
        record,
        updateUserDailyPerformanceDto,
      );
      return await this.userDailyPerformanceRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating user daily performance');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.userDailyPerformanceRepository.delete(id);
      return { message: 'User daily performance deleted' };
    } catch {
      throw new BadRequestException('Error deleting user daily performance');
    }
  }
}
