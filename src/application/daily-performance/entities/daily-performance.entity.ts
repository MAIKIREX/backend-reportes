import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('daily_performance')
export class DailyPerformance {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'row_number' })
  rowNumber: number;

  @ApiProperty({ example: 'Juan Perez' })
  @Column({ type: 'varchar', length: 255, name: 'auditor_name' })
  auditorName: string;

  @ApiProperty({ example: '2026-03-15', type: String })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ example: 'La Paz Metropolitana' })
  @Column({ type: 'varchar', length: 255, name: 'metropolitan_area' })
  metropolitanArea: string;

  @ApiProperty({ example: 'La Paz' })
  @Column({ type: 'varchar', length: 255, name: 'city_name' })
  cityName: string;

  @ApiProperty({ example: 'USR-001' })
  @Column({ type: 'varchar', length: 255, name: 'user_id' })
  userId: string;

  @ApiProperty({ example: 10 })
  @Column({ type: 'int', name: 'visits_for_recruitment' })
  visitsForRecruitment: number;

  @ApiProperty({ example: 4 })
  @Column({ type: 'int', name: 'pos_recruited' })
  posRecruited: number;

  @ApiProperty({ example: 8 })
  @Column({ type: 'int', name: 'visits_for_invoice_collection' })
  visitsForInvoiceCollection: number;

  @ApiProperty({ example: '08:00:00' })
  @Column({ type: 'time', name: 'first_task_time' })
  firstTaskTime: string;

  @ApiProperty({ example: '17:00:00' })
  @Column({ type: 'time', name: 'last_task_time' })
  lastTaskTime: string;

  @ApiProperty({ example: 6 })
  @Column({ type: 'int', name: 'visits_with_invoice_collection' })
  visitsWithInvoiceCollection: number;

  @ApiProperty({ example: 5 })
  @Column({ type: 'int', name: 'visits_with_invoice_and_approved_census' })
  visitsWithInvoiceAndApprovedCensus: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'visits_with_invoice_and_incomplete_census' })
  visitsWithInvoiceAndIncompleteCensus: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'int', name: 'visits_with_invoice_and_rejected_census' })
  visitsWithInvoiceAndRejectedCensus: number;

  @ApiProperty({ example: 2 })
  @Column({ type: 'int', name: 'visits_with_pending_qc_census' })
  visitsWithPendingQcCensus: number;

  @ApiProperty({ example: 1 })
  @Column({
    type: 'int',
    name: 'visits_with_rejected_invoice_and_approved_census',
  })
  visitsWithRejectedInvoiceAndApprovedCensus: number;

  @ApiProperty({ example: 3 })
  @Column({
    type: 'int',
    name: 'approved_census_collected_in_invoice_bundle',
  })
  approvedCensusCollectedInInvoiceBundle: number;

  @ApiProperty({ example: 40.5 })
  @Column({ type: 'decimal', precision: 10, scale: 2, name: 'recruitment_rate' })
  recruitmentRate: number;

  @ApiProperty({ example: 7.5 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'time_in_forms_hours',
  })
  timeInFormsHours: number;

  @ApiProperty({ example: 2.25 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'time_walking_hours',
  })
  timeWalkingHours: number;

  @ApiProperty({ example: 75.2 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'invoice_collection_rate',
  })
  invoiceCollectionRate: number;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
