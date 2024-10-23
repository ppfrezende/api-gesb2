import { CustomersRepository } from '@/repositories/customers-repository';
import { Customer } from '@prisma/client';

interface CreateCustomerUseCaseRequest {
  company_name: string;
  cnpj: string;
  cep: string;
  street: string;
  complement: string;
  city: string;
  uf: string;
  establishment_number: string;
  phone: string;
  userName: string;
}

interface CreateCustomerUseCaseResponse {
  customer: Customer;
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomersRepository) {}

  async execute({
    company_name,
    cnpj,
    cep,
    street,
    complement,
    city,
    uf,
    establishment_number,
    phone,
    userName,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    const customer = await this.customersRepository.create({
      company_name,
      cnpj,
      cep,
      street,
      complement,
      city,
      uf,
      establishment_number,
      phone,
      userName,
    });

    return {
      customer,
    };
  }
}
