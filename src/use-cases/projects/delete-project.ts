import { ProjectsRepository } from '@/repositories/projects-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface DeleteProjectUseCaseRequest {
  projectId: string;
}

export class DeleteProjectUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({ projectId }: DeleteProjectUseCaseRequest): Promise<void> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new ResourceNotFoundError();
    } else {
      await this.projectRepository.delete(projectId);

      return;
    }
  }
}
