import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { CreateSiteUseCase } from '../../sites/create-site';

export function makeCreateSiteUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new CreateSiteUseCase(prismaSitesRepository);

  return useCase;
}
