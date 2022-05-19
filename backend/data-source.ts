import "reflect-metadata"

import { DataSource} from "typeorm"

import { counter_users } from "./entities/counter_users"
import { counters } from "./entities/counters"
import { issues } from "./entities/issues"
import { normal_users } from "./entities/normal_users"
import { notifications } from "./entities/notifications"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "queuemanagementsystem",
    entities: [counter_users, counters, issues , normal_users, notifications],
    synchronize: true,
    logging: true,
})
