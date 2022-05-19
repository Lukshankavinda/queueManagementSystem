import {    Entity, 
            PrimaryGeneratedColumn, 
            Column, 
            BaseEntity, 
            JoinColumn, 
            ManyToOne, 
            CreateDateColumn, 
            UpdateDateColumn 
        } from 'typeorm';

import {normal_users} from "./normal_users";
import {counters} from "./counters";

export type UserRoleType = "waiting" | "inprogress" | "close"

@Entity()
export class issues extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    tpno!: string;

    @Column()
    email!: string;

    @Column("text")
    issue!: string

    @Column({
        type: "enum",
        enum: ["waiting", "inprogress", "close"],
        default: "waiting"
    })
    status!: UserRoleType[]

    @Column()
    issue_no!: number;

    @ManyToOne(() => normal_users)
    @JoinColumn()
    normalUsers!: normal_users;

    @ManyToOne(() => counters)
    @JoinColumn()
    counters!: counters;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
    
}
