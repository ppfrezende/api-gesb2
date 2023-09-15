import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createIntervention } from './create-intervention';
import { deleteIntervention } from './delete-intervention';
import { getIntervention } from './get-intervention';
import { getInterventionsList } from './get-interventions-list';
import { updateIntervention } from './update-intervention';

export async function interventionRoutes(app: FastifyInstance) {
  app.post(
    '/interventions',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    createIntervention,
  );

  app.delete(
    '/interventions/:interventionId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    deleteIntervention,
  );

  app.get(
    '/interventions/:interventionId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getIntervention,
  );

  app.get(
    '/interventions',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getInterventionsList,
  );

  app.put(
    '/interventions/:interventionId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    updateIntervention,
  );
}
