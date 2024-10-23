import { PrismaTechniciansRepository } from '@/repositories/prisma/prisma-technicians-repository';
import { GetTechnicianByRegistrationNumberUseCase } from '../../technicians/get-technician-by-registration-number';

export function makeGetTechnicianByRegistrationNumberUseCase() {
  const prismaTechniciansRepository = new PrismaTechniciansRepository();
  const useCase = new GetTechnicianByRegistrationNumberUseCase(
    prismaTechniciansRepository,
  );

  return useCase;
}
