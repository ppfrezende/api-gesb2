import { ServiceProvider, Prisma } from '@prisma/client';

export interface ServiceProvidersRepository {
  findById(id: string): Promise<ServiceProvider | null>;
  findByEmail(email: string): Promise<ServiceProvider | null>;
  findByCpf(cpf: string): Promise<ServiceProvider | null>;
  findByRg(rg: string): Promise<ServiceProvider | null>;
  findByCnpj(cnpj: string): Promise<ServiceProvider | null>;
  listMany(page: number): Promise<ServiceProvider[]>;
  searchMany(query: string, page: number): Promise<ServiceProvider[]>;
  create(
    data: Prisma.ServiceProviderUncheckedCreateInput,
  ): Promise<ServiceProvider>;
  update(
    id: string,
    data: Prisma.ServiceProviderUpdateInput,
  ): Promise<ServiceProvider | null>;
  delete(id: string): Promise<void | null>;
}
