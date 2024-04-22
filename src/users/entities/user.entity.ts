import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IUser from '../interfaces/user.interface';
import { Role } from '../../guard/roles/enum/role.enum';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 255, default: [Role.USER] })
  role: Role[];

  @Column({ type: 'date', nullable: false })
  birthday: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
