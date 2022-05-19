import {    Entity, 
            PrimaryGeneratedColumn, 
            Column, 
            BaseEntity, 
            CreateDateColumn, 
            UpdateDateColumn 
        } from 'typeorm';

@Entity()
export class normal_users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    email!: string;

    @Column()
    password!: string;

    @Column()
    tpno!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
    
}
