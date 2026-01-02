import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('profiles')
export class Profile {
  @ApiProperty({ description: 'Identificador del perfil' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Nombre del usuario' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'nombre del usuario',
  })
  name: string;

  @ApiProperty({ description: 'Apellido del usuario' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'apellido del usuario',
    name: 'last_name',
  })
  lastname: string;

  @ApiProperty({ description: 'Fecha de creacion', type: String })
  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({ description: 'Fecha de actualizacion', type: String })
  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({ type: () => User, description: 'Usuario asociado' })
  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
