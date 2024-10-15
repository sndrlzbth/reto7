import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('protected/users')
export class UsersController {

    constructor(private usersService: UsersService){}
    @UseGuards(JwtAuthGuard)
    @Post()
    createUser(@Body() newUser: CreateUserDTO){
        return this.usersService.createUser(newUser);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers(): Promise<User[]>{
        return this.usersService.getUsers();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.getUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteUser(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto){
        return this.usersService.updateUser(id, user);
    }
}
