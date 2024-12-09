import { prisma } from '@/lib/prisma';
import { Site, Prisma } from '@prisma/client';
import { SitesRepository } from '../sites-repository';

export class PrismaSitesRepository implements SitesRepository {
  async findById(id: string): Promise<Site | null> {
    const site = await prisma.site.findUnique({
      where: {
        id,
      },
      include: {
        interventions: true,
        technicians: true,
      },
    });

    return site;
  }

  async listMany(page: number) {
    const sites = await prisma.site.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return sites;
  }

  async listAll() {
    const sites = await prisma.site.findMany({
      where: {
        isDeleted: false,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return sites;
  }

  async listAllSitesTrash() {
    const sites = await prisma.site.findMany({
      where: {
        isDeleted: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return sites;
  }

  async searchMany(query: string, page: number) {
    const sites = await prisma.site.findMany({
      where: {
        isDeleted: false,

        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            description: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            administrator_name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            operation_zone: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return sites;
  }

  async create(data: Prisma.SiteUncheckedCreateInput) {
    const site = await prisma.site.create({
      data,
    });

    return site;
  }

  async update(id: string, data: Prisma.SiteUpdateInput) {
    const site = await prisma.site.update({
      where: {
        id,
      },
      data,
    });

    return site;
  }
  async delete(id: string, deletedBy: string) {
    await prisma.site.update({
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
