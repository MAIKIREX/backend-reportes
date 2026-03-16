import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('edge_configurations')
export class EdgeConfiguration {
  @ApiProperty({ description: 'Identificador del registro' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'La Paz Metropolitana' })
  @Column({ type: 'varchar', length: 255, name: 'metropolitan_area' })
  metropolitanArea: string;

  @ApiProperty({ example: 'La Paz' })
  @Column({ type: 'varchar', length: 255, name: 'city_name' })
  cityName: string;

  @ApiProperty({ example: 'MO-EDGE-01' })
  @Column({ type: 'varchar', length: 255 })
  mo: string;

  @ApiProperty({ example: 'LPZ' })
  @Column({ type: 'varchar', length: 255, name: 'simplified_city' })
  simplifiedCity: string;

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
