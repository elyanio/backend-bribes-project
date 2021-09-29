/* eslint-disable prettier/prettier */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class List {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    q: string;

    @Column()
    result: string;
}