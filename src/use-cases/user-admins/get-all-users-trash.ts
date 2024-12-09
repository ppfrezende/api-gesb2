import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';

interface GetAllUsersTrashUseCaseResponse {
  totalCount: string;
  users: User[];
}

export class GetAllUsersTrashUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<GetAllUsersTrashUseCaseResponse> {
    const users = await this.usersRepository.listAllTrash();

    users.map((user) => {
      user.password_hash = 'NON-for-ur-bussines';
      return user;
    });

    const totalCount = users.length.toString();

    return {
      users,
      totalCount,
    };
  }
}
