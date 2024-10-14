import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './leave.schema';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
  ) {}

  async createLeave(employeeId: number, startDate: Date, endDate: Date): Promise<Leave> {
    const leave = this.leaveRepository.create({ employeeId, startDate, endDate, status: 'pending' });
    return this.leaveRepository.save(leave);
  }

  async getLeaves(): Promise<Leave[]> {
    return this.leaveRepository.find();
  }

  async updateLeave(id: number, updateData: Partial<Leave>): Promise<Leave> {
    await this.leaveRepository.update(id, updateData);
    const updatedLeave = await this.leaveRepository.findOne({ where: { id } });

    // Set notification message based on status
    if (updatedLeave) {
      if (updatedLeave.status === 'approved') {
        updatedLeave.notificationMessage = 'Your leave request has been approved.';
      } else if (updatedLeave.status === 'rejected') {
        updatedLeave.notificationMessage = 'Your leave request has been rejected.';
      }
      await this.leaveRepository.save(updatedLeave);
    }

    return updatedLeave;
  }

  async deleteLeave(id: number): Promise<void> {
    await this.leaveRepository.delete(id);
  }

  async getLeavesByEmployeeId(employeeId: number): Promise<Leave[]> {
    return this.leaveRepository.find({ where: { employeeId } });
  }
}