import { EmployeesRepository } from '@/repositories/employees-repository';
import { Employee } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface RegisterEmployeeUseCaseRequest {
  name: string;
  registration_number: string;
  cpf: string;
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
  userId: string;
  salary: number;
  skills: string;
}

interface RegisterEmployeeUseCaseResponse {
  employee: Employee;
}

export class RegisterEmployeeUseCase {
  constructor(private employeeRepository: EmployeesRepository) {}

  async execute({
    name,
    registration_number,
    cpf,
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
    userId,
    skills,
  }: RegisterEmployeeUseCaseRequest): Promise<RegisterEmployeeUseCaseResponse> {
    const employeesWithSameEmail = await this.employeeRepository.findByEmail(
      email,
    );
    const employeesWithSameCpf = await this.employeeRepository.findByCpf(cpf);

    const employessWithSameRegistrationNumber =
      await this.employeeRepository.findByRegistrationNumber(
        registration_number,
      );

    if (
      employeesWithSameEmail ||
      employeesWithSameCpf ||
      employessWithSameRegistrationNumber
    ) {
      throw new ResourceAlreadyExists();
    }

    const employee = await this.employeeRepository.create({
      name,
      registration_number,
      cpf,
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
      userId,
      skills,
    });

    return {
      employee,
    };
  }
}
