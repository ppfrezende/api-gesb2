import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { UpdateTechnicianUseCase } from '../../technicians/update-technician';

export function makeUpdateTechnicianUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new UpdateTechnicianUseCase(prismaTechniciansRepository);

  return useCase;
}
