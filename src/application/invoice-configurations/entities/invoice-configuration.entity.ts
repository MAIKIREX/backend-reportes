import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('invoice_configurations')
export class InvoiceConfiguration {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'LPZ' })
  @Column({ type: 'varchar', length: 255, name: 'simplified_city' })
  simplifiedCity: string;

  @ApiProperty({ example: 'La Paz, El Alto' })
  @Column({ type: 'varchar', length: 255 })
  cities: string;

  @ApiProperty({ example: 'MO-01' })
  @Column({ type: 'varchar', length: 255 })
  mo: string;

  @ApiProperty({ example: 'Sabado, Domingo' })
  @Column({ type: 'varchar', length: 255 })
  breaks: string;

  @ApiProperty({ example: '2026-03-01', type: String })
  @Column({ type: 'date', name: 'start_date' })
  startDate: string;

  @ApiProperty({ example: '2026-03-31', type: String })
  @Column({ type: 'date', name: 'end_date' })
  endDate: string;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
