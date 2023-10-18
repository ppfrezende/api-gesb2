import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface RegisterEmployeeUseCaseRequest {
  name: string;
  cpf: string;
  rg: string;
  email: string;
  admission_at: Date;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  job_title: string;
  userName: string;
  salary: number;
}

interface RegisterEmployeeUseCaseResponse {
  employee: Employee;
}

export class RegisterEmployeeUseCase {
  constructor(private employeeRepository: EmployeesRepository) {}

  async execute({
    name,
    cpf,
    rg,
    email,
    admission_at,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    salary,
    job_title,
    userName,
  }: RegisterEmployeeUseCaseRequest): Promise<RegisterEmployeeUseCaseResponse> {
    const employeesWithSameEmail = await this.employeeRepository.findByEmail(
      email,
    );
    const employeesWithSameCpf = await this.employeeRepository.findByCpf(cpf);
    const employeesWithSameRg = await this.employeeRepository.findByRg(rg);

    if (employeesWithSameEmail || employeesWithSameCpf || employeesWithSameRg) {
      throw new ResourceAlreadyExists();
    }

    const employee = await this.employeeRepository.create({
      name,
      cpf,
      rg,
      email,
      admission_at,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      salary,
      job_title,
      userName,
    });

    return {
      employee,
    };
  }
}
