import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { DeleteTechnicianUseCase } from '../../technicians/delete-technician';

export function makeDeleteTechnicianUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new DeleteTechnicianUseCase(prismaTechniciansRepository);

  return useCase;
}
