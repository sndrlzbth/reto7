import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @ApiOperation({ summary: 'Registrar un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario registrado con éxito.' })
    @ApiResponse({ status: 409, description: 'Usuario ya existe.' })
    @Post('register')
    async register(@Body() createUserDto: CreateUserDTO) {
        return this.authService.register(createUserDto);
    }
    
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiBody({ type: LoginDTO })
    @ApiResponse({ status: 200, description: 'Login exitoso.' })
    @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDTO) {
        return this.authService.login(loginDto);
    }
}
