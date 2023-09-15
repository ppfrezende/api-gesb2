import { User, Prisma } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { randomUUID } from 'node:crypto';

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = [];

  async listMany(page: number): Promise<User[]> {
    return this.items
      .filter((item) => item.name)
      .slice((page - 1) * 20, page * 20);
  }

  async searchMany(query: string, page: number): Promise<User[]> {
    return this.items
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      sector: data.sector,
      email: data.email,
      password_hash: data.password_hash,
      role: data.role,
      avatar: data.avatar,
      created_at: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async delete(id: string) {
    const index = this.items.findIndex((item) => item.id === id);

    if (!index) {
      return null;
    } else {
      this.items.splice(index, 1);
    }
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const users = this.items;
    const index = this.items.findIndex((item) => item.id === id);

    for (const key in data) {
      users[index][key] = data[key];
    }

    return users[index];
  }
}
