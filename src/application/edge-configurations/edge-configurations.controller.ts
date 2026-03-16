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
import { CreateEdgeConfigurationDto } from './dto/create-edge-configuration.dto';
import { UpdateEdgeConfigurationDto } from './dto/update-edge-configuration.dto';
import { EdgeConfiguration } from './entities/edge-configuration.entity';
import { EdgeConfigurationsService } from './edge-configurations.service';

@Controller('edge-configurations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('edge-configurations')
@ApiBearerAuth('jwt')
export class EdgeConfigurationsController {
  constructor(
    private readonly edgeConfigurationsService: EdgeConfigurationsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear configuracion EDGE' })
  @ApiCreatedResponse({ description: 'Registro creado', type: EdgeConfiguration })
  create(@Body() createEdgeConfigurationDto: CreateEdgeConfigurationDto) {
    return this.edgeConfigurationsService.create(createEdgeConfigurationDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar configuraciones EDGE' })
  @ApiOkResponse({ description: 'Listado de registros', type: [EdgeConfiguration] })
  findAll() {
    return this.edgeConfigurationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener configuracion EDGE por ID' })
  @ApiOkResponse({ description: 'Registro encontrado', type: EdgeConfiguration })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.edgeConfigurationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar configuracion EDGE' })
  @ApiOkResponse({ description: 'Registro actualizado', type: EdgeConfiguration })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateEdgeConfigurationDto: UpdateEdgeConfigurationDto,
  ) {
    return this.edgeConfigurationsService.update(id, updateEdgeConfigurationDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar configuracion EDGE' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.edgeConfigurationsService.remove(id);
  }
}
