import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('system_registrations')
export class SystemRegistration {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Juan' })
  @Column({ type: 'varchar', length: 255, name: 'first_name' })
  firstName: string;

  @ApiProperty({ example: 'Perez Gomez' })
  @Column({ type: 'varchar', length: 255, name: 'last_name' })
  lastName: string;

  @ApiProperty({ example: '12345678' })
  @Column({ type: 'varchar', length: 100, name: 'identity_number' })
  identityNumber: string;

  @ApiProperty({ example: 'Bolivia' })
  @Column({ type: 'varchar', length: 150 })
  country: string;

  @ApiProperty({ example: 'Occidente' })
  @Column({ type: 'varchar', length: 150 })
  area: string;

  @ApiProperty({ example: 'La Paz' })
  @Column({ type: 'varchar', length: 150 })
  city: string;

  @ApiProperty({ example: '1995-08-20', type: String })
  @Column({ type: 'date', name: 'birth_date' })
  birthDate: string;

  @ApiProperty({ example: 'Av. Siempre Viva 123' })
  @Column({ type: 'varchar', length: 255 })
  address: string;

  @ApiProperty({ example: 'juan@mail.com' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ example: '+59170000000' })
  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @ApiProperty({ example: 'Activo' })
  @Column({ type: 'varchar', length: 100 })
  status: string;

  @ApiProperty({ example: 'Tiempo completo' })
  @Column({ type: 'varchar', length: 100 })
  time: string;

  @ApiProperty({ example: 'Proyecto Edge' })
  @Column({ type: 'varchar', length: 255 })
  project: string;

  @ApiProperty({ example: 'Interno' })
  @Column({ type: 'varchar', length: 100, name: 'staff_type' })
  staffType: string;

  @ApiProperty({ example: 'Observacion interna', required: false })
  @Column({ type: 'varchar', length: 255, name: 'unnamed_14', nullable: true })
  unnamed14?: string;

  @ApiProperty({ example: true })
  @Column({ type: 'boolean' })
  contacted: boolean;

  @ApiProperty({ example: 'Supervisor Principal' })
  @Column({ type: 'varchar', length: 255 })
  supervisor: string;

  @ApiProperty({ example: '2026-01-15', type: String })
  @Column({ type: 'date', name: 'entry_date' })
  entryDate: string;

  @ApiProperty({ example: 'Enero' })
  @Column({ type: 'varchar', length: 50, name: 'entry_month' })
  entryMonth: string;

  @ApiProperty({ example: '2026-03-15', type: String })
  @Column({ type: 'date' })
  today: string;

  @ApiProperty({ example: 59 })
  @Column({ type: 'int', name: 'seniority_days' })
  seniorityDays: number;

  @ApiProperty({ example: 'Senior' })
  @Column({ type: 'varchar', length: 100 })
  level: string;

  @ApiProperty({ example: 'WPP-01' })
  @Column({ type: 'varchar', length: 100 })
  wpp: string;

  @ApiProperty({ example: 'INV-01' })
  @Column({ type: 'varchar', length: 100 })
  inv: string;

  @ApiProperty({ example: '2026-04-20', required: false, type: String })
  @Column({ type: 'date', name: 'exit_date', nullable: true })
  exitDate?: string;

  @ApiProperty({ example: 'Abril', required: false })
  @Column({ type: 'varchar', length: 50, name: 'exit_month', nullable: true })
  exitMonth?: string;

  @ApiProperty({ example: 95 })
  @Column({ type: 'int', name: 'worked_days' })
  workedDays: number;

  @ApiProperty({ example: 'Fin de contrato', required: false })
  @Column({ type: 'varchar', length: 255, name: 'exit_reason', nullable: true })
  exitReason?: string;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
