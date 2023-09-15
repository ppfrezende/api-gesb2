import { ProjectsRepository } from '@/repositories/projects-repository';
import { Project } from '@prisma/client';

interface SearchProjectsUseCaseRequest {
  query: string;
  page: number;
}

interface SearchProjectsUseCaseResponse {
  projects: Project[];
}

export class SearchProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    query,
    page,
  }: SearchProjectsUseCaseRequest): Promise<SearchProjectsUseCaseResponse> {
    const projects = await this.projectsRepository.searchMany(query, page);

    return {
      projects,
    };
  }
}
