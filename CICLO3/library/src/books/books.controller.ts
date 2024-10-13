import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
@Controller('books')
export class BooksController {

    constructor(private booksService: BooksService){}
    @Post()
    createUser(@Body() newBook: CreateBookDto): Promise<Book>{
       return this.booksService.createBook(newBook);
    }

    @Get()
    getBooks(): Promise<Book[]> {
        return this.booksService.getBooks();
    }

    @Get(':id')
    getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book> {
        return this.booksService.getBookById(id);
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number) {
        return this.booksService.deleteBook(id);
    }

    @Patch(':id')
    updateBook(@Param('id', ParseIntPipe) id: number, @Body() book: UpdateBookDto) {
        return this.booksService.updateBook(id, book);
    }
}