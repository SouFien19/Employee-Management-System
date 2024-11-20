import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PerformanceEvaluation } from './evaluation.schema';

@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(PerformanceEvaluation)
    private evaluationRepository: Repository<PerformanceEvaluation>,
  ) {}

  async createEvaluation(data: { employeeId: number; score: number; comments: string }): Promise<PerformanceEvaluation> {
    const evaluation = this.evaluationRepository.create(data);
    return this.evaluationRepository.save(evaluation);
  }

  async getEvaluations(req): Promise<PerformanceEvaluation[]> {
    const user = req.body.user; // Extract the user from the request body
    const employeeId = user.id;
    console.log(user);
    // Check if the user exists and has a valid role
    if (!user || !user.role) {
      throw new UnauthorizedException('No valid user or role found');
    }
  
    // If the user is HR, return all evaluations
    if (user.role === 'HR') {
      return this.evaluationRepository.find(); // Get all evaluations
    } else {
      // If the user is not HR, return evaluations specific to the employee
      return this.evaluationRepository.find({ where: { employeeId } });
    }
  }
  
  async getAllEvaluations(): Promise<PerformanceEvaluation[]> {
    return this.evaluationRepository.find();
  }

  async updateEvaluation(id: number, updateData: Partial<PerformanceEvaluation>): Promise<PerformanceEvaluation> {
    await this.evaluationRepository.update(id, updateData);
    const updatedEvaluation = await this.evaluationRepository.findOne({ where: { id } });
    if (!updatedEvaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    return updatedEvaluation;
  }

  async deleteEvaluation(id: number): Promise<void> {
    const evaluation = await this.evaluationRepository.findOne({ where: { id } });
    if (!evaluation) {
      throw new NotFoundException(`Evaluation with ID ${id} not found`);
    }
    await this.evaluationRepository.delete(id);
  }
}
