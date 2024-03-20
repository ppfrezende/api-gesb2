import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionByCustomerUseCase } from '../../interventions/get-intervention-by-customer';

export function makeGetInterventionByCustomerUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionByCustomerUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
