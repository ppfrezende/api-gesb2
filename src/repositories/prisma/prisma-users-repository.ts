import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository {
  async searchMany(query: string, page: number) {
    const users = await prisma.user.findMany({
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
            email: {
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

    return users;
  }

  async listMany(page: number) {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
      take: 10,
      skip: (page - 1) * 10,
      orderBy: {
        created_at: 'desc',
      },
    });

    return users;
  }

  async listAll() {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: false,
      },
    });

    return users;
  }

  async listAllTrash() {
    const users = await prisma.user.findMany({
      where: {
        isDeleted: true,
      },
    });

    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
        isDeleted: false,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
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
    const user = await prisma.user.create({
      data: dataToCreate,
    });

    return user;
  }

  async delete(id: string, deletedBy: string) {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
        deletedBy,
        deleted_at: new Date(),
      },
    });

    return;
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }
}
