import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { searchEmployees } from '../employees/search-employee';
import { getTechniciansList } from './get-technicians-list';

export async function techniciansRoutes(app: FastifyInstance) {
  app.get(
    '/technicians',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getTechniciansList,
  );

  app.get(
    '/technicians/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    searchEmployees,
  );
}
