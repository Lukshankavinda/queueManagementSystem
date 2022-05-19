import {    Entity, 
            PrimaryGeneratedColumn, 
            Column, 
            BaseEntity, 
            OneToOne, 
            JoinColumn, 
            CreateDateColumn, 
            UpdateDateColumn 
        } from 'typeorm';

import {counter_users} from "./counter_users";        

export type UserRoleType = "active" | "close" 

@Entity()
export class counters extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => counter_users)
    @JoinColumn()
    counterUsers!: counter_users;

    @Column({
        type: "enum",
        enum: ["active", "close" ],
    })
    status!: UserRoleType[]

    @Column()
    counter_number!: number;

    @Column({nullable: true})
    ongoin!: number;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
    
}
