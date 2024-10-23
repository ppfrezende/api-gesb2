import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { GetAllSitesListUseCase } from '../../sites/get-all-sites';

export function makeGetAllSitesListUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new GetAllSitesListUseCase(prismaSitesRepository);

  return useCase;
}
