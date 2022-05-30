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

    @ManyToOne(type => normal_users, { nullable: false , eager: true })
    @JoinColumn({ name: 'normalUsersId', referencedColumnName: 'id' })
    public normalUsers!: normal_users;

    @ManyToOne(type => counters, { nullable: false , eager: true })
    @JoinColumn({ name: 'counterId' , referencedColumnName: 'id'})
    public counter!: counters;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updateAt!: Date;
    
}
