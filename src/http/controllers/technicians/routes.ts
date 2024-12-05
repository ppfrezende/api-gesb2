import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { getTechniciansList } from './get-technicians-list';
import { getTechnician } from './get-technician';
import { searchTechnicians } from './search-technicians';
import { getAllTechniciansList } from './get-all-technicians';

export async function techniciansRoutes(app: FastifyInstance) {
  app.get(
    '/technicians',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'FINANCE', 'ADMIN'])],
    },
    getTechniciansList,
  );
  app.get(
    '/all-technicians',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'FINANCE', 'ADMIN'])],
    },
    getAllTechniciansList,
  );

  app.get(
    '/technicians/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'FINANCE', 'ADMIN'])],
    },
    getTechnician,
  );

  app.get(
    '/technicians/search',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'FINANCE', 'ADMIN'])],
    },
    searchTechnicians,
  );
}
