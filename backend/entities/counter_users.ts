import {    Entity, 
            PrimaryGeneratedColumn, 
            Column, 
            BaseEntity, 
            CreateDateColumn, 
            UpdateDateColumn 
        } from 'typeorm';

@Entity()
export class counter_users extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({ unique: true})
    user_name!: string;

    @Column()
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
    
}
