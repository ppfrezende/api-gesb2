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
    const service_provider = await prisma.serviceProvider.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    return service_provider;
  }

  async findByCpf(cpf: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findFirst({
      where: {
        cpf,
        isDeleted: false,
      },
    });

    return service_provider;
  }

  async findByCnpj(cnpj: string): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findFirst({
      where: {
        cnpj,
        isDeleted: false,
      },
    });

    return service_provider;
  }

  async findByRegistrationNumber(
    registration_number: string,
  ): Promise<ServiceProvider | null> {
    const service_provider = await prisma.serviceProvider.findFirst({
      where: {
        registration_number,
        isDeleted: false,
      },
    });

    return service_provider;
  }

  async listMany(page: number) {
    const service_providers = await prisma.serviceProvider.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async listAll() {
    const service_providers = await prisma.serviceProvider.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async listAllServiceProvidersTrash() {
    const service_providers = await prisma.serviceProvider.findMany({
      where: {
        isDeleted: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async searchMany(query: string, page: number) {
    const service_providers = await prisma.serviceProvider.findMany({
      where: {
        isDeleted: false,
        name: {
          contains: query,
        },
        email: {
          contains: query,
        },
        job_title: {
          contains: query,
        },
        cpf: {
          contains: query,
        },
        skills: {
          contains: query,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return service_providers;
  }

  async create(data: Prisma.ServiceProviderUncheckedCreateInput) {
    const now = new Date();
    const createdAtUTC = new Date(
      Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        now.getHours(),
        now.getMinutes(),
        now.getSeconds(),
        now.getMilliseconds(),
      ),
    ).toISOString();

    const dataToCreate = {
      ...data,
      created_at: createdAtUTC,
    };
    const service_provider = await prisma.serviceProvider.create({
      data: dataToCreate,
    });

    return service_provider;
  }

  async update(
    id: string,
    updatedBy: string,
    data: Prisma.ServiceProviderUpdateInput,
  ) {
    const dataToUpdate = {
      ...data,
      updatedBy,
    };
    const service_provider = await prisma.serviceProvider.update({
      where: {
        id,
      },
      data: dataToUpdate,
    });

    return service_provider;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.serviceProvider.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deleted_at: new Date(),
        deletedBy,
      },
    });

    return;
  }
}
