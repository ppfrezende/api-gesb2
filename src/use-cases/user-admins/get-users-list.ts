import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetUsersUseCaseRequest {
  page: number;
}

interface GetUsersUseCaseResponse {
  numberOfRegisters: string;
  totalCount: string;
  users: User[];
}

export class GetUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: GetUsersUseCaseRequest): Promise<GetUsersUseCaseResponse> {
    const users = await this.usersRepository.listMany(page);
    const allUsers = await this.usersRepository.listAll();

    users.map((user) => {
      user.password_hash = 'NON-for-ur-bussines';
      return user;
    });

    const numberOfRegisters = users.length.toString();
    const totalCount = allUsers.length.toString();

    return {
      users,
      numberOfRegisters,
      totalCount,
    };
  }
}
