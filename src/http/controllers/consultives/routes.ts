import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createConsultive } from './create-consultive';
import { deleteConsultive } from './delete-consultive';
import { updateConsultive } from './update-consultive';
import { getConsultivesList } from './get-consultives-list';
import { getConsultive } from './get-consultive';

export async function consultivesRoutes(app: FastifyInstance) {
  app.post(
    '/consultives',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    createConsultive,
  );

  app.delete(
    '/consultives/:consultiveId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    deleteConsultive,
  );

  app.put(
    '/consultives/:consultiveId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    updateConsultive,
  );

  app.get(
    '/consultives',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getConsultivesList,
  );

  app.get(
    '/consultives/:consultiveId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getConsultive,
  );
}
