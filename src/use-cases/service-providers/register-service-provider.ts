import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface RegisterServiceProviderUseCaseRequest {
  name: string;
  company: string;
  registration_number: string;
  cpf: string;
  cnpj: string;
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
  userName: string;
  skills: string;
}

interface RegisterServiceProviderUseCaseResponse {
  service_provider: ServiceProvider;
}

export class RegisterServiceProviderUseCase {
  constructor(private serviceProviderRepository: ServiceProvidersRepository) {}

  async execute({
    name,
    company,
    registration_number,
    cpf,
    cnpj,
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
    userName,
    skills,
  }: RegisterServiceProviderUseCaseRequest): Promise<RegisterServiceProviderUseCaseResponse> {
    const serviceProviderWithSameEmail =
      await this.serviceProviderRepository.findByEmail(email);
    const serviceProviderWithSameCpf =
      await this.serviceProviderRepository.findByCpf(cpf);
    const serviceProviderWithSameCnpj =
      await this.serviceProviderRepository.findByCnpj(cnpj);
    const serviceProviderWithSameRegistrationNumber =
      await this.serviceProviderRepository.findByRegistrationNumber(
        registration_number,
      );

    if (
      serviceProviderWithSameEmail ||
      serviceProviderWithSameCpf ||
      serviceProviderWithSameCnpj ||
      serviceProviderWithSameRegistrationNumber
    ) {
      throw new ResourceAlreadyExists();
    }

    const service_provider = await this.serviceProviderRepository.create({
      name,
      company,
      registration_number,
      cpf,
      cnpj,
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
      userName,
      skills,
    });

    return {
      service_provider,
    };
  }
}
