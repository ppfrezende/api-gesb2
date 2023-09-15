import { ProjectsRepository } from '@/repositories/projects-repository';
import { Prisma, Project } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface UpdateProjectUseCaseRequest {
  projectId: string;
  data: Prisma.ProjectUpdateInput;
}

interface UpdateProjectUseCaseResponse {
  updatedProject: Project | null;
}

export class UpdateProjectUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({
    projectId,
    data,
  }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new ResourceNotFoundError();
    }

    const updatedProject = await this.projectRepository.update(projectId, data);

    return {
      updatedProject,
    };
  }
}
