import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('protected/users')
export class UsersController {

    constructor(private usersService: UsersService){}
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado con éxito.' })
    @ApiResponse({ status: 409, description: 'El usuario ya existe.' })
    @UseGuards(JwtAuthGuard)
    @Post()
    createUser(@Body() newUser: CreateUserDTO){
        return this.usersService.createUser(newUser);
    }

    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios.' })
    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers(): Promise<User[]>{
        return this.usersService.getUsers();
    }

    @ApiOperation({ summary: 'Obtener un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getUser(id);
    }

    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id);
    }

    @ApiOperation({ summary: 'Actualizar un usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado con éxito.' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }
}
