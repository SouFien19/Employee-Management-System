import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Leave } from './leave.schema';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async createLeave(
    @Body() leaveData: { employeeId: number; startDate: Date; endDate: Date }
  ): Promise<Leave> {
    return this.leaveService.createLeave(
      leaveData.employeeId,
      leaveData.startDate,
      leaveData.endDate
    );
  }

  @Get()
  async getLeaves(): Promise<Leave[]> {
    return this.leaveService.getLeaves();
  }

  @Patch(':id/approve') // New route for approving leave
  async approveLeave(@Param('id') id: number): Promise<Leave> {
    return this.leaveService.updateLeave(id, { status: 'approved' });
  }

  @Patch(':id/reject') // New route for rejecting leave
  async rejectLeave(@Param('id') id: number): Promise<Leave> {
    return this.leaveService.updateLeave(id, { status: 'rejected' });
  }

  @Get('notifications/:employeeId')
  async getNotifications(@Param('employeeId') employeeId: number): Promise<Leave[]> {
    return this.leaveService.getLeavesByEmployeeId(employeeId);
  }

  @Patch(':id') // Update leave with partial data
  async updateLeave(
    @Param('id') id: number,
    @Body() updateData: Partial<Leave>
  ): Promise<Leave> {
    return this.leaveService.updateLeave(id, updateData);
  }

  @Delete(':id')
  async deleteLeave(@Param('id') id: number): Promise<void> {
    return this.leaveService.deleteLeave(id);
  }
}