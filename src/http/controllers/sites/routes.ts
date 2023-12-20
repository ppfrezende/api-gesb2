import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createSite } from './create-site';
import { updateSite } from './update-site';
import { getSite } from './get-site';
import { getSitesList } from './get-sites-list';
import { deleteSite } from './delete-site';
import { searchSites } from './search-site';

export async function sitesRoutes(app: FastifyInstance) {
  app.post(
    '/sites',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createSite,
  );

  app.put(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updateSite,
  );

  app.get(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getSite,
  );

  app.get(
    '/sites',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getSitesList,
  );

  app.delete(
    '/sites/:siteId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteSite,
  );

  app.get(
    '/sites/search',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    searchSites,
  );
}
