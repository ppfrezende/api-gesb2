import { UsersRepository } from '@/repositories/users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteUserUseCaseRequest {
  userId: string;
  deletedBy: string;
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    deletedBy,
  }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    } else {
      await this.usersRepository.delete(userId, deletedBy);

      return;
    }
  }
}
