import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from '../../core/auth/guards/roles.guard';
import { Roles } from '../../core/auth/decorators/roles.decorator';
import { Role } from '../../core/auth/models/roles.model';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('users')
@ApiBearerAuth('jwt')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiOkResponse({ description: 'Listado de usuarios', type: [User] })
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiOkResponse({ description: 'Usuario encontrado', type: User })
  findUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getUserById(id);
  }

  @Get(':id/profile')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Obtener perfil del usuario' })
  @ApiOkResponse({ description: 'Perfil encontrado', type: Profile })
  getProfile(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.getProfileByUserId(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Crear un usuario' })
  @ApiCreatedResponse({ description: 'Usuario creado', type: User })
  createUser(@Body() body: CreateUserDto, @Req() req: Request) {
    return this.usersService.create(body, req.user as any);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiOkResponse({ description: 'Usuario eliminado' })
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiOkResponse({ description: 'Usuario actualizado' })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() changes: UpdateUserDto,
  ) {
    return this.usersService.update(id, changes);
  }
}
