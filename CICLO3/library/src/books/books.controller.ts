import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth() 
@Controller('protected/books')
export class BooksController {
    constructor(private booksService: BooksService){}
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Crear un nuevo libro' })
    @ApiResponse({ status: 201, description: 'Libro creado con éxito.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Post()
    createUser(@Body() newBook: CreateBookDto){
       return this.booksService.createBook(newBook);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtener todos los libros' })
    @ApiResponse({ status: 200, description: 'Lista de libros.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Get()
    getBooks(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Obtener un libro por ID' })
    @ApiParam({ name: 'id', description: 'ID del libro' })
    @ApiResponse({ status: 200, description: 'Libro encontrado.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Get(':id')
    getBookById(@Param('id', ParseIntPipe) id: number){
        return this.booksService.getBookById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Eliminar un libro por ID' })
    @ApiParam({ name: 'id', description: 'ID del libro' })
    @ApiResponse({ status: 200, description: 'Libro eliminado con éxito.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.deleteBook(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Actualizar un libro por ID' })
    @ApiParam({ name: 'id', description: 'ID del libro' })
    @ApiResponse({ status: 200, description: 'Libro actualizado con éxito.' })
    @ApiResponse({ status: 404, description: 'Libro no encontrado.' })
    @ApiResponse({ status: 401, description: 'No autorizado.' })
    @Patch(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto) {
        return this.booksService.updateBook(id, book);
    }
}