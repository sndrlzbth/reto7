import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, UseGuards } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('protected/books')
export class BooksController {
    constructor(private booksService: BooksService){}
    @UseGuards(JwtAuthGuard)
    @Post()
    createUser(@Body() newBook: CreateBookDto){
       return this.booksService.createBook(newBook);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getBooks(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getBookById(@Param('id', ParseIntPipe) id: number){
        return this.booksService.getBookById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.deleteBook(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto) {
        return this.booksService.updateBook(id, book);
    }
}