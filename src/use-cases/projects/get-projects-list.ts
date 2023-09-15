import { ProjectsRepository } from '@/repositories/projects-repository';
import { Project } from '@prisma/client';

interface GetProjectsUseCaseRequest {
  page: number;
}

interface GetProjectsUseCaseResponse {
  numberOfRegisters: string;
  projects: Project[];
}

export class GetProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    page,
  }: GetProjectsUseCaseRequest): Promise<GetProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.listMany(page);

    projects.map((project) => {
      return project;
    });

    const numberOfRegisters = projects.length.toString();

    return {
      projects,
      numberOfRegisters,
    };
  }
}
