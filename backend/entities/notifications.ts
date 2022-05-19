import {    Entity, 
            PrimaryGeneratedColumn, 
            Column, 
            BaseEntity,
            OneToOne,
            JoinColumn, 
            CreateDateColumn, 
            UpdateDateColumn 
        } from 'typeorm';

import {issues} from "./issues";

@Entity()
export class notifications extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    message!: string;

    @OneToOne(() => issues)
    @JoinColumn()
    issues!: issues;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;

}
