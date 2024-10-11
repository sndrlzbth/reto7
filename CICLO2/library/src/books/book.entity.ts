import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'books'})
export class Book {
    @PrimaryGeneratedColumn()
    id:number

    @Column( {unique: true} )
    title:string

    @Column()
    author:string

    @Column()
    year:number
}