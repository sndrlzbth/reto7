import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async register(createUserDto: CreateUserDTO) {
        const user = await this.usersService.createUser({
            ...createUserDto,
            password: await bcrypt.hash(createUserDto.password, 10),
        });
        return user;
    }

    async login(loginDto: LoginDTO) {
        const user = await this.usersService.getUserByUsername(loginDto.username);

        if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        const payload = { username: user.username, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
