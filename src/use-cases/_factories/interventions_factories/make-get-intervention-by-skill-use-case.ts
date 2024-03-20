import { PrismaInterventionsRepository } from '@/repositories/prisma/prisma-interventions-repository';
import { GetInterventionBySkillUseCase } from '../../interventions/get-intervention-by-skill';

export function makeGetInterventionBySkillUseCase() {
  const prismaInterventionsRepository = new PrismaInterventionsRepository();
  const useCase = new GetInterventionBySkillUseCase(
    prismaInterventionsRepository,
  );

  return useCase;
}
