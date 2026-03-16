import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_daily_performance')
export class UserDailyPerformance {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'row_number' })
  rowNumber: number;

  @ApiProperty({ example: '2026-03-15', type: String })
  @Column({ type: 'date' })
  date: string;

  @ApiProperty({ example: 'La Paz Metropolitana' })
  @Column({ type: 'varchar', length: 255, name: 'metropolitan_area' })
  metropolitanArea: string;

  @ApiProperty({ example: 'USR-001' })
  @Column({ type: 'varchar', length: 255, name: 'user_id' })
  userId: string;

  @ApiProperty({ example: 'La Paz' })
  @Column({ type: 'varchar', length: 255, name: 'city_name' })
  cityName: string;

  @ApiProperty({ example: 'Juan Perez' })
  @Column({ type: 'varchar', length: 255, name: 'auditor_name' })
  auditorName: string;

  @ApiProperty({ example: 20 })
  @Column({ type: 'int', name: 'total_pos' })
  totalPos: number;

  @ApiProperty({ example: 15 })
  @Column({ type: 'int', name: 'approved_pos' })
  approvedPos: number;

  @ApiProperty({ example: 2 })
  @Column({ type: 'int', name: 'partially_rejected_pos' })
  partiallyRejectedPos: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'rejected_pos' })
  rejectedPos: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'in_qc_pos' })
  inQcPos: number;

  @ApiProperty({ example: 1 })
  @Column({ type: 'int', name: 'incomplete_pos' })
  incompletePos: number;

  @ApiProperty({ example: 0 })
  @Column({ type: 'int', name: 'refusal_pos' })
  refusalPos: number;

  @ApiProperty({ example: 5 })
  @Column({ type: 'int', name: 'visited_microzones' })
  visitedMicrozones: number;

  @ApiProperty({ example: '08:30:00' })
  @Column({ type: 'time', name: 'first_task_time' })
  firstTaskTime: string;

  @ApiProperty({ example: '17:10:00' })
  @Column({ type: 'time', name: 'last_task_time' })
  lastTaskTime: string;

  @ApiProperty({ example: 6.5 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'time_in_forms_hours',
  })
  timeInFormsHours: number;

  @ApiProperty({ example: 1.75 })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    name: 'time_walking_hours',
  })
  timeWalkingHours: number;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
