import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionByCustomerProjectManagerUseCase } from '../../interventions/get-intervention-by-customer-project-manager';

export function makeGetInterventionByCustomerProjectManagerUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionByCustomerProjectManagerUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
