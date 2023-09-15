import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { UpdateSiteUseCase } from '../../sites/update-site';

export function makeUpdateSiteUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new UpdateSiteUseCase(prismaSitesRepository);

  return useCase;
}
