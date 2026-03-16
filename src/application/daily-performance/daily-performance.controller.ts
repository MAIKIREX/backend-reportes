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
import { CreateDailyPerformanceDto } from './dto/create-daily-performance.dto';
import { UpdateDailyPerformanceDto } from './dto/update-daily-performance.dto';
import { DailyPerformance } from './entities/daily-performance.entity';
import { DailyPerformanceService } from './daily-performance.service';

@Controller('daily-performance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('daily-performance')
@ApiBearerAuth('jwt')
export class DailyPerformanceController {
  constructor(
    private readonly dailyPerformanceService: DailyPerformanceService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear registro de daily performance' })
  @ApiCreatedResponse({ description: 'Registro creado', type: DailyPerformance })
  create(@Body() createDailyPerformanceDto: CreateDailyPerformanceDto) {
    return this.dailyPerformanceService.create(createDailyPerformanceDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar registros de daily performance' })
  @ApiOkResponse({ description: 'Listado de registros', type: [DailyPerformance] })
  findAll() {
    return this.dailyPerformanceService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener registro de daily performance por ID' })
  @ApiOkResponse({ description: 'Registro encontrado', type: DailyPerformance })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.dailyPerformanceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar registro de daily performance' })
  @ApiOkResponse({ description: 'Registro actualizado', type: DailyPerformance })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDailyPerformanceDto: UpdateDailyPerformanceDto,
  ) {
    return this.dailyPerformanceService.update(id, updateDailyPerformanceDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar registro de daily performance' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.dailyPerformanceService.remove(id);
  }
}
