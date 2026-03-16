import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInvoiceConfigurationDto } from './dto/create-invoice-configuration.dto';
import { UpdateInvoiceConfigurationDto } from './dto/update-invoice-configuration.dto';
import { InvoiceConfiguration } from './entities/invoice-configuration.entity';

@Injectable()
export class InvoiceConfigurationsService {
  constructor(
    @InjectRepository(InvoiceConfiguration)
    private readonly invoiceConfigurationRepository: Repository<InvoiceConfiguration>,
  ) {}

  async create(createInvoiceConfigurationDto: CreateInvoiceConfigurationDto) {
    try {
      const record = this.invoiceConfigurationRepository.create(
        createInvoiceConfigurationDto,
      );
      return await this.invoiceConfigurationRepository.save(record);
    } catch {
      throw new BadRequestException('Error creating invoice configuration');
    }
  }

  async findAll() {
    return this.invoiceConfigurationRepository.find({
      order: { startDate: 'DESC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const record = await this.invoiceConfigurationRepository.findOne({
      where: { id },
    });

    if (!record) {
      throw new NotFoundException(
        `Invoice configuration with id ${id} not found`,
      );
    }

    return record;
  }

  async update(
    id: string,
    updateInvoiceConfigurationDto: UpdateInvoiceConfigurationDto,
  ) {
    try {
      const record = await this.findOne(id);
      const updated = this.invoiceConfigurationRepository.merge(
        record,
        updateInvoiceConfigurationDto,
      );
      return await this.invoiceConfigurationRepository.save(updated);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Error updating invoice configuration');
    }
  }

  async remove(id: string) {
    await this.findOne(id);

    try {
      await this.invoiceConfigurationRepository.delete(id);
      return { message: 'Invoice configuration deleted' };
    } catch {
      throw new BadRequestException('Error deleting invoice configuration');
    }
  }
}
