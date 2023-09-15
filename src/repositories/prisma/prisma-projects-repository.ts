import { prisma } from '@/lib/prisma';
import { Project, Prisma } from '@prisma/client';
import { ProjectsRepository } from '../projects-repository';

export class PrismaProjectsRepository implements ProjectsRepository {
  async findById(id: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    return project;
  }

  async findByPurchaseOrder(purchase_order: string): Promise<Project | null> {
    const project = await prisma.project.findUnique({
      where: {
        purchase_order,
      },
    });

    return project;
  }

  async listMany(page: number) {
    const projects = await prisma.project.findMany({
      take: 20,
      skip: (page - 1) * 20,
    });

    return projects;
  }

  async searchMany(query: string, page: number) {
    const projects = await prisma.project.findMany({
      where: {
        customer: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return projects;
  }

  async create(data: Prisma.ProjectUncheckedCreateInput) {
    const project = await prisma.project.create({
      data,
    });

    return project;
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    const project = await prisma.project.update({
      where: {
        id,
      },
      data,
    });

    return project;
  }
  async delete(id: string) {
    await prisma.project.delete({
      where: {
        id,
      },
    });

    return;
  }
}
