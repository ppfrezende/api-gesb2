import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetEmployeeProfileUseCaseRequest {
  employeeId: string;
}

interface GetEmployeeProfileUseCaseResponse {
  employee: Employee;
}

export class GetEmployeeProfileUseCase {
  constructor(private employeesRepository: EmployeesRepository) {}

  async execute({
    employeeId,
  }: GetEmployeeProfileUseCaseRequest): Promise<GetEmployeeProfileUseCaseResponse> {
    const employee = await this.employeesRepository.findById(employeeId);

    if (!employee) {
      throw new ResourceNotFoundError();
    }

    return {
      employee,
    };
  }
}
