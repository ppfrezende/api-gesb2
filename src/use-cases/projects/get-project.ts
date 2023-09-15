import { ProjectsRepository } from '@/repositories/projects-repository';
import { Project } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface GetProjectUseCaseRequest {
  projectId: string;
}

interface GetProjectUseCaseResponse {
  project: Project;
}

export class GetProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    projectId,
  }: GetProjectUseCaseRequest): Promise<GetProjectUseCaseResponse> {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) {
      throw new ResourceNotFoundError();
    }

    return {
      project,
    };
  }
}
