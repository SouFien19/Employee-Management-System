// leave.schema.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ nullable: false })
  reason: string; // New field for reason for leave

  @Column({ default: 'pending' })
  status: string; // e.g., 'pending', 'approved', 'rejected'

  @Column({ nullable: true })
  notificationMessage: string; // New field for notifications
}
