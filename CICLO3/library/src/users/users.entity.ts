import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string
    
}