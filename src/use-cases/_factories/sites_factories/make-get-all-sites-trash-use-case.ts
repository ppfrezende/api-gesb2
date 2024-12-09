import { PrismaSitesRepository } from '@/repositories/prisma/prisma-sites-repository';
import { GetAllSitesTrashListUseCase } from '../../sites/get-all-sites-trash';

export function makeGetAllSitesTrashListUseCase() {
  const prismaSitesRepository = new PrismaSitesRepository();
  const useCase = new GetAllSitesTrashListUseCase(prismaSitesRepository);

  return useCase;
}
