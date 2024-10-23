import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createIntervention } from './create-intervention';
import { deleteIntervention } from './delete-intervention';
import { updateInterventions } from './update-intervention';
import { getInterventionsList } from './get-interventions-list';
import { getIntervention } from './get-intervention';
import { searchInterventions } from './search-interventions';

export async function interventionsRoutes(app: FastifyInstance) {
  app.post(
    '/interventions',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createIntervention,
  );

  app.delete(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteIntervention,
  );

  app.put(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updateInterventions,
  );

  app.get(
    '/interventions',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getInterventionsList,
  );

  app.get(
    '/interventions/search',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    searchInterventions,
  );

  app.get(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getIntervention,
  );
}
