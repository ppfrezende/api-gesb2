import { ServiceProvidersRepository } from '@/repositories/service-providers-repository';
import { ServiceProvider } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface RegisterServiceProviderUseCaseRequest {
  name: string;
  cpf: string;
  rg: string;
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
  userEmail: string;
}

interface RegisterServiceProviderUseCaseResponse {
  service_provider: ServiceProvider;
}

export class RegisterServiceProviderUseCase {
  constructor(private serviceProviderRepository: ServiceProvidersRepository) {}

  async execute({
    name,
    cpf,
    rg,
    cnpj,
    email,
    contract_validity,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    userEmail,
    normal_hour,
    extra_hour,
    day_hour,
    uf,
    contract_value,
  }: RegisterServiceProviderUseCaseRequest): Promise<RegisterServiceProviderUseCaseResponse> {
    const serviceProviderWithSameEmail =
      await this.serviceProviderRepository.findByEmail(email);
    const serviceProviderWithSameCpf =
      await this.serviceProviderRepository.findByCpf(cpf);
    const serviceProviderWithSameRg =
      await this.serviceProviderRepository.findByRg(rg);
    const serviceProviderWithSameCnpj =
      await this.serviceProviderRepository.findByCnpj(cnpj);

    if (
      serviceProviderWithSameEmail ||
      serviceProviderWithSameCpf ||
      serviceProviderWithSameRg ||
      serviceProviderWithSameCnpj
    ) {
      throw new ResourceAlreadyExists();
    }

    const service_provider = await this.serviceProviderRepository.create({
      name,
      cpf,
      rg,
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
      userEmail,
      contract_value,
    });

    return {
      service_provider,
    };
  }
}
