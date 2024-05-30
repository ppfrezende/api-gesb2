import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { GetTechnicianUseCase } from '../../technicians/get-technician';

export function makeGetTechnicianUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new GetTechnicianUseCase(prismaTechniciansRepository);

  return useCase;
}
