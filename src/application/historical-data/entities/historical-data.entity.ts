import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('historical_data')
export class HistoricalData {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'row_number' })
  rowNumber: number;

  @ApiProperty({ example: '2026-03-15', type: String })
  @Column({ type: 'date', name: 'submitted_date' })
  submittedDate: string;

  @ApiProperty({ example: 'La Paz' })
  @Column({ type: 'varchar', length: 255, name: 'city_name' })
  cityName: string;

  @ApiProperty({ example: 'Juan Perez' })
  @Column({ type: 'varchar', length: 255, name: 'auditor_name' })
  auditorName: string;

  @ApiProperty({ example: 'PLACE-001' })
  @Column({ type: 'varchar', length: 255, name: 'place_id' })
  placeId: string;

  @ApiProperty({ example: 6 })
  @Column({ type: 'int', name: 'purchase_diaries' })
  purchaseDiaries: number;

  @ApiProperty({ example: 12 })
  @Column({ type: 'int', name: 'total_invoice_collected' })
  totalInvoiceCollected: number;

  @ApiProperty({ example: 9 })
  @Column({ type: 'int', name: 'total_pos_collected' })
  totalPosCollected: number;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
