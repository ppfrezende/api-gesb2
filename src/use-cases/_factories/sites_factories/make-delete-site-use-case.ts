import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { DeleteSiteUseCase } from '../../sites/delete-site';

export function makeDeleteSiteUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new DeleteSiteUseCase(prismaSitesRepository);

  return useCase;
}
