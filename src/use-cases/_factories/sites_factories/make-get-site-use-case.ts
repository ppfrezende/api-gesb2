import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { GetSiteUseCase } from '../../sites/get-site';

export function makeGetSiteUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new GetSiteUseCase(prismaSitesRepository);

  return useCase;
}
