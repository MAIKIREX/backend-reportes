import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { Role } from '../../core/auth/models/roles.model';
import { CreateSystemRegistrationDto } from './dto/create-system-registration.dto';
import { UpdateSystemRegistrationDto } from './dto/update-system-registration.dto';
import { SystemRegistration } from './entities/system-registration.entity';
import { SystemRegistrationsService } from './system-registrations.service';

@Controller('system-registrations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('system-registrations')
@ApiBearerAuth('jwt')
export class SystemRegistrationsController {
  constructor(
    private readonly systemRegistrationsService: SystemRegistrationsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear registro de sistema' })
  @ApiCreatedResponse({ description: 'Registro creado', type: SystemRegistration })
  create(@Body() createSystemRegistrationDto: CreateSystemRegistrationDto) {
    return this.systemRegistrationsService.create(createSystemRegistrationDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar registros de sistema' })
  @ApiOkResponse({
    description: 'Listado de registros',
    type: [SystemRegistration],
  })
  findAll() {
    return this.systemRegistrationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener registro de sistema por ID' })
  @ApiOkResponse({ description: 'Registro encontrado', type: SystemRegistration })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.systemRegistrationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar registro de sistema' })
  @ApiOkResponse({ description: 'Registro actualizado', type: SystemRegistration })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateSystemRegistrationDto: UpdateSystemRegistrationDto,
  ) {
    return this.systemRegistrationsService.update(id, updateSystemRegistrationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar registro de sistema' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.systemRegistrationsService.remove(id);
  }
}
