import { EmployeesRepository } from '@/repositories/employees-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteEmployeeUseCaseRequest {
  employeeId: string;
  deletedBy: string;
}

export class DeleteEmployeeUseCase {
  constructor(private employeeRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    deletedBy,
  }: DeleteEmployeeUseCaseRequest): Promise<void> {
    const employee = await this.employeeRepository.findById(employeeId);

    if (!employee) {
      throw new ResourceNotFoundError();
    } else {
      await this.employeeRepository.delete(employeeId, deletedBy);

      return;
    }
  }
}
