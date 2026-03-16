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
import { CreateUserDailyPerformanceDto } from './dto/create-user-daily-performance.dto';
import { UpdateUserDailyPerformanceDto } from './dto/update-user-daily-performance.dto';
import { UserDailyPerformance } from './entities/user-daily-performance.entity';
import { UserDailyPerformanceService } from './user-daily-performance.service';

@Controller('user-daily-performance')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('user-daily-performance')
@ApiBearerAuth('jwt')
export class UserDailyPerformanceController {
  constructor(
    private readonly userDailyPerformanceService: UserDailyPerformanceService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear desempeno diario por usuario' })
  @ApiCreatedResponse({ description: 'Registro creado', type: UserDailyPerformance })
  create(@Body() createUserDailyPerformanceDto: CreateUserDailyPerformanceDto) {
    return this.userDailyPerformanceService.create(
      createUserDailyPerformanceDto,
    );
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar desempenos diarios por usuario' })
  @ApiOkResponse({
    description: 'Listado de registros',
    type: [UserDailyPerformance],
  })
  findAll() {
    return this.userDailyPerformanceService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener desempeno diario por usuario por ID' })
  @ApiOkResponse({ description: 'Registro encontrado', type: UserDailyPerformance })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDailyPerformanceService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar desempeno diario por usuario' })
  @ApiOkResponse({ description: 'Registro actualizado', type: UserDailyPerformance })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDailyPerformanceDto: UpdateUserDailyPerformanceDto,
  ) {
    return this.userDailyPerformanceService.update(
      id,
      updateUserDailyPerformanceDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar desempeno diario por usuario' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.userDailyPerformanceService.remove(id);
  }
}
