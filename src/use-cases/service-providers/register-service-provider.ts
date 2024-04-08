import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface RegisterServiceProviderUseCaseRequest {
  name: string;
  registration_number: string;
  cpf: string;
  cnpj: string;
  email: string;
  contract_validity: Date;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
  normal_hour: number;
  extra_hour: number;
  day_hour: number;
  contract_value: number;
  job_title: string;
  userName: string;
}

interface RegisterServiceProviderUseCaseResponse {
  service_provider: ServiceProvider;
}

export class RegisterServiceProviderUseCase {
  constructor(private serviceProviderRepository: ServiceProvidersRepository) {}

  async execute({
    name,
    registration_number,
    cpf,
    cnpj,
    email,
    contract_validity,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    normal_hour,
    extra_hour,
    day_hour,
    uf,
    contract_value,
    job_title,
    userName,
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
      registration_number,
      cpf,
      cnpj,
      email,
      contract_validity,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      normal_hour,
      extra_hour,
      day_hour,
      contract_value,
      job_title,
      userName,
    });

    return {
      service_provider,
    };
  }
}
