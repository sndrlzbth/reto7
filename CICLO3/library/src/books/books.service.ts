import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class BooksService {
    constructor(@InjectRepository(Book) private bookRepository:Repository<Book>) { 
    }

    async createBook(book: CreateBookDto) {
        const existingBook = await this.bookRepository.findOne({
            where: {
                title: book.title
            }
        });
        
        if (existingBook) {
            return new HttpException('Book already exists', HttpStatus.CONFLICT);
        }

        const newBook = this.bookRepository.create(book);
        return this.bookRepository.save(newBook);
    }

    getBooks() {
        return this.bookRepository.find();
    }

    async getBookById(id: number) {
        const bookFound = await this.bookRepository.findOne({
            where: {
                id: id
            }
        });

        if(!bookFound) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }

        return bookFound;
    }

    async deleteBook(id: number) {
        const reult = await this.bookRepository.delete({id});

        if(reult.affected === 0) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }
    }

    async updateBook(id: number, book: UpdateBookDto) {
        const bookFound = await this.bookRepository.findOne({
            where: {
                id: id
            }
        });

        if(!bookFound) {
            return new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }   

        const updatedBook = Object.assign(bookFound, book);
        return this.bookRepository.save(updatedBook);
    }

}
