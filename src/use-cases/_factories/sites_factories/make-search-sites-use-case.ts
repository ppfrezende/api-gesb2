import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { SearchSitesUseCase } from '../../sites/search-site';

export function makeSearchSitesUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new SearchSitesUseCase(prismaSitesRepository);

  return useCase;
}
