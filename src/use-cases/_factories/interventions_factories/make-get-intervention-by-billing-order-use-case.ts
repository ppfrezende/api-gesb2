import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionByBillingOrderUseCase } from '../../interventions/get-intervention-by-billing-order';

export function makeGetInterventionByBillingOrderUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionByBillingOrderUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
