import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createSite } from './create-site';
import { updateSite } from './update-site';
import { getSite } from './get-site';
import { getSitesList } from './get-sites-list';
import { deleteSite } from './delete-site';
import { searchSites } from './search-site';
import { getAllSitesList } from './get-all-sites';
import { getAllSitesTrashList } from './get-all-sites-trash';

export async function sitesRoutes(app: FastifyInstance) {
  app.post(
    '/sites',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    createSite,
  );

  app.put(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    updateSite,
  );

  app.get(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getSite,
  );

  app.get(
    '/all-sites',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getAllSitesList,
  );

  app.get(
    '/sites',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getSitesList,
  );

  app.delete(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    deleteSite,
  );

  app.get(
    '/sites/search',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    searchSites,
  );

  app.get(
    '/sites/trash',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    getAllSitesTrashList,
  );
}
