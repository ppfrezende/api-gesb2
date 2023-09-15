import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { GetSitesListUseCase } from '../../sites/get-sites-list';

export function makeGetSitesListUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new GetSitesListUseCase(prismaSitesRepository);

  return useCase;
}
