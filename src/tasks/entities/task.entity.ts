import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import ITask from "../interfaces/task.interface";
import { User } from "src/users/entities/user.entity";

@Entity('tasks')
export class Task implements ITask {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user_id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    title: string;

    @Column({ type: 'text', nullable: false })
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date;
}
