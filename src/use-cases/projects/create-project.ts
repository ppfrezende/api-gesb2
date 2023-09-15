import { ProjectsRepository } from '@/repositories/projects-repository';
import { Project } from '@prisma/client';
import { ResourceAlreadyExists } from '../errors/resource-already-exists';

interface CreateProjectUseCaseRequest {
  purchase_order: string;
  title: string;
  customer: string;
  customer_email: string;
  description: string;
  initial_at: Date;
  finished_at?: Date;
  site: string;
  estimate: number;
  userEmail: string;
}

interface CreateProjectUseCaseResponse {
  project: Project;
}

export class CreateProjectUseCase {
  constructor(private projectRepository: ProjectsRepository) {}

  async execute({
    purchase_order,
    title,
    customer,
    customer_email,
    initial_at,
    description,
    finished_at,
    site,
    estimate,
    userEmail,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const projectWithSamePO = await this.projectRepository.findByPurchaseOrder(
      purchase_order,
    );

    if (projectWithSamePO) {
      throw new ResourceAlreadyExists();
    }

    const project = await this.projectRepository.create({
      purchase_order,
      title,
      customer,
      customer_email,
      description,
      initial_at,
      finished_at,
      site,
      estimate,
      userEmail,
    });

    return {
      project,
    };
  }
}
