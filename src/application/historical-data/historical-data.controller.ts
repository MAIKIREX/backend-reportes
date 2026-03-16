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
import { CreateHistoricalDataDto } from './dto/create-historical-data.dto';
import { UpdateHistoricalDataDto } from './dto/update-historical-data.dto';
import { HistoricalData } from './entities/historical-data.entity';
import { HistoricalDataService } from './historical-data.service';

@Controller('historical-data')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('historical-data')
@ApiBearerAuth('jwt')
export class HistoricalDataController {
  constructor(private readonly historicalDataService: HistoricalDataService) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear registro historico' })
  @ApiCreatedResponse({ description: 'Registro creado', type: HistoricalData })
  create(@Body() createHistoricalDataDto: CreateHistoricalDataDto) {
    return this.historicalDataService.create(createHistoricalDataDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar datos historicos' })
  @ApiOkResponse({ description: 'Listado de registros', type: [HistoricalData] })
  findAll() {
    return this.historicalDataService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener dato historico por ID' })
  @ApiOkResponse({ description: 'Registro encontrado', type: HistoricalData })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.historicalDataService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar dato historico' })
  @ApiOkResponse({ description: 'Registro actualizado', type: HistoricalData })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateHistoricalDataDto: UpdateHistoricalDataDto,
  ) {
    return this.historicalDataService.update(id, updateHistoricalDataDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar dato historico' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.historicalDataService.remove(id);
  }
}
