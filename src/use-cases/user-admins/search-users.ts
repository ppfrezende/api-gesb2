import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface SearchUsersUseCaseRequest {
  query: string;
  page: number;
}

interface SearchUsersUseCaseResponse {
  users: User[];
}

export class SearchUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
  }: SearchUsersUseCaseRequest): Promise<SearchUsersUseCaseResponse> {
    const users = await this.usersRepository.searchMany(query, page);

    users.map((user) => {
      user.password_hash = 'NON-for-ur-bussines';
      return user;
    });

    return { users };
  }
}
