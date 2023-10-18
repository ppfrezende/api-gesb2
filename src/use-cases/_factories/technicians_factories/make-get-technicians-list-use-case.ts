import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { GetTechniciansListUseCase } from '../../technicians/get-technicians-list';

export function makeGetTechniciansListUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new GetTechniciansListUseCase(prismaTechniciansRepository);

  return useCase;
}
