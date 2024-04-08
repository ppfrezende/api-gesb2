import { prisma } from '@/lib/prisma';
import { ServiceProvider, Prisma } from '@prisma/client';
import { ServiceProvidersRepository } from '../service-providers-repository';

export class PrismaServiceProvidersRepository
  implements ServiceProvidersRepository
{
  async findById(id: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findUnique({
      where: {
        id,
      },
    });

    return service_provider;
  }

  async findByEmail(email: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findUnique({
      where: {
        email,
      },
    });

    return service_provider;
  }

  async findByCpf(cpf: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findUnique({
      where: {
        cpf,
      },
    });

    return service_provider;
  }

  async findByCnpj(cnpj: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findUnique({
      where: {
        cnpj,
      },
    });

    return service_provider;
  }

  async findByRegistrationNumber(
    registration_number: string,
  ): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findUnique({
      where: {
        registration_number,
      },
    });

    return service_provider;
  }

  async listMany(page: number) {
    const service_providers = await prisma.serviceProvider.findMany({
      take: 100,
      skip: (page - 1) * 100,
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async searchMany(query: string, page: number) {
    const service_providers = await prisma.serviceProvider.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      take: 100,
      skip: (page - 1) * 100,
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async create(data: Prisma.ServiceProviderUncheckedCreateInput) {
    const service_provider = await prisma.serviceProvider.create({
      data,
    });

    return service_provider;
  }

  async update(id: string, data: Prisma.ServiceProviderUpdateInput) {
    const service_provider = await prisma.serviceProvider.update({
      where: {
        id,
      },
      data,
    });

    return service_provider;
  }

  async delete(id: string) {
    await prisma.serviceProvider.delete({
      where: {
        id,
      },
    });

    return;
  }
}
