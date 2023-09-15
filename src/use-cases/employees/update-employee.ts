import { EmployeesRepository } from '@/repositories/employees-repository';
import { Prisma, Employee } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { deleteFile } from '@/utils/file';

interface UpdateEmployeeProfileUseCaseRequest {
  employeeId: string;
  data: Prisma.EmployeeUpdateInput;
}

interface UpdateEmployeeProfileUseCaseResponse {
  updatedEmployee: Employee | null;
}

export class UpdateEmployeeProfileUseCase {
  constructor(private employeeRepository: EmployeesRepository) {}

  async execute({
    employeeId,
    data,
  }: UpdateEmployeeProfileUseCaseRequest): Promise<UpdateEmployeeProfileUseCaseResponse> {
    const employee = await this.employeeRepository.findById(employeeId);

    if (!employee) {
      throw new ResourceNotFoundError();
    }

    if (employee.avatar) {
      await deleteFile(`./tmp/avatar/${employee.avatar!}`);
    }

    const updatedEmployee = await this.employeeRepository.update(
      employeeId,
      data,
    );

    return {
      updatedEmployee,
    };
  }
}
