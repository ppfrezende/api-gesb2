import { SelfEmployed } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';
import { SelfEmployeesRepository } from '@/repositories/self-employees-repository';

interface CreateSelfEmployedUseCaseRequest {
  name: string;
  registration_number: string;
  document_type: string;
  document_number: string;
  email: string;
  start_of_contract: Date;
  contract_validity: Date;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  job_title: string;
  userId: string;
  skills: string;
}

interface CreateSelfEmployedUseCaseResponse {
  self_employed: SelfEmployed;
}

export class CreateSelfEmployedUseCase {
  constructor(private selfEmployedRepository: SelfEmployeesRepository) {}

  async execute({
    name,
    registration_number,
    document_type,
    document_number,
    email,
    start_of_contract,
    contract_validity,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    job_title,
    userId,
    skills,
  }: CreateSelfEmployedUseCaseRequest): Promise<CreateSelfEmployedUseCaseResponse> {
    const selfEmployedWithSameEmail =
      await this.selfEmployedRepository.findByEmail(email);

    const selfEmployedWithSameRegistrationNumber =
      await this.selfEmployedRepository.findByRegistrationNumber(
        registration_number,
      );

    if (selfEmployedWithSameEmail || selfEmployedWithSameRegistrationNumber) {
      throw new ResourceAlreadyExists();
    }

    const self_employed = await this.selfEmployedRepository.create({
      name,
      registration_number,
      document_type,
      document_number,
      email,
      start_of_contract,
      contract_validity,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      job_title,
      userId,
      skills,
    });

    return {
      self_employed,
    };
  }
}
