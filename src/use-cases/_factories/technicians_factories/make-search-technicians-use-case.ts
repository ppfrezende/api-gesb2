import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { SearchTechniciansUseCase } from '../../technicians/search-technician';

export function makeSearchTechniciansUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new SearchTechniciansUseCase(prismaTechniciansRepository);

  return useCase;
}
