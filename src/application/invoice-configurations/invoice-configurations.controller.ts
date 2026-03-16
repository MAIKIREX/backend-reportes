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
import { CreateInvoiceConfigurationDto } from './dto/create-invoice-configuration.dto';
import { UpdateInvoiceConfigurationDto } from './dto/update-invoice-configuration.dto';
import { InvoiceConfiguration } from './entities/invoice-configuration.entity';
import { InvoiceConfigurationsService } from './invoice-configurations.service';

@Controller('invoice-configurations')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('invoice-configurations')
@ApiBearerAuth('jwt')
export class InvoiceConfigurationsController {
  constructor(
    private readonly invoiceConfigurationsService: InvoiceConfigurationsService,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear configuracion de invoice' })
  @ApiCreatedResponse({
    description: 'Registro creado',
    type: InvoiceConfiguration,
  })
  create(@Body() createInvoiceConfigurationDto: CreateInvoiceConfigurationDto) {
    return this.invoiceConfigurationsService.create(
      createInvoiceConfigurationDto,
    );
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar configuraciones de invoice' })
  @ApiOkResponse({
    description: 'Listado de configuraciones',
    type: [InvoiceConfiguration],
  })
  findAll() {
    return this.invoiceConfigurationsService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener configuracion de invoice por ID' })
  @ApiOkResponse({
    description: 'Registro encontrado',
    type: InvoiceConfiguration,
  })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.invoiceConfigurationsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar configuracion de invoice' })
  @ApiOkResponse({
    description: 'Registro actualizado',
    type: InvoiceConfiguration,
  })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInvoiceConfigurationDto: UpdateInvoiceConfigurationDto,
  ) {
    return this.invoiceConfigurationsService.update(
      id,
      updateInvoiceConfigurationDto,
    );
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar configuracion de invoice' })
  @ApiOkResponse({ description: 'Registro eliminado' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.invoiceConfigurationsService.remove(id);
  }
}
