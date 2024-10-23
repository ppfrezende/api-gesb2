import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { GetAllTechniciansListUseCase } from '../../technicians/get-all-technicians';

export function makeGetAllTechniciansListUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new GetAllTechniciansListUseCase(prismaTechniciansRepository);

  return useCase;
}
