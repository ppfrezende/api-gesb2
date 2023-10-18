import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { CreateTechnicianUseCase } from '../../technicians/create-technician';

export function makeCreateTechnicianUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new CreateTechnicianUseCase(prismaTechniciansRepository);

  return useCase;
}
