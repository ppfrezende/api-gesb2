import { UsersRepository } from '@/repositories/users-repository';
import { Prisma, User } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { deleteFile } from '@/utils/file';

interface UpdateUserProfileUseCaseRequest {
  userId: string;
  data: Prisma.UserUpdateInput;
}

interface UpdateUserProfileUseCaseResponse {
  updatedUser: User | null;
}

export class UpdateUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    data,
  }: UpdateUserProfileUseCaseRequest): Promise<UpdateUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (user.avatar) {
      await deleteFile(`tmp/avatar/${user.avatar!}`);
    }

    const updatedUser = await this.usersRepository.update(userId, data);

    return {
      updatedUser,
    };
  }
}
