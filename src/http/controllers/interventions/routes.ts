import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createIntervention } from './create-intervention';
import { deleteIntervention } from './delete-intervention';
import { updateInterventions } from './update-intervention';
import { getInterventionsList } from './get-interventions-list';
import { getIntervention } from './get-intervention';
import { searchInterventions } from './search-interventions';
import { getAllInterventionsList } from './get-all-interventions';
import { getMonthlyInterventionsProfitTotalValue } from './get-total-monthly-interventions-profit';
import { getAnualInterventionsProfitTotalValue } from './get-total-anual-interventions-profit';
import { getTotalEachMonthInterventionsProfit } from './get-total-each-month-interventions-profit';
import { getTotalEachMonthInterventionsCount } from './get-total-each-month-interventions-count';
import { getAllInterventionsTrashList } from './get-all-interventions-trash';
import { generateResumeForApproval } from './generate-resume-for-approval';
import { approveIntervention } from './approve-intervention';
import { getAnualInterventionsProfitExpectedValue } from './get-expected-anual-interventions-profit';

export async function interventionsRoutes(app: FastifyInstance) {
  app.post(
    '/interventions',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    createIntervention,
  );

  app.delete(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    deleteIntervention,
  );

  app.put(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    updateInterventions,
  );

  app.get(
    '/interventions',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getInterventionsList,
  );

  app.get(
    '/all-interventions',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getAllInterventionsList,
  );

  app.get(
    '/interventions/search',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN', 'FINANCE', 'SERVICE'])] },
    searchInterventions,
  );

  app.get(
    '/interventions/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getIntervention,
  );

  app.get(
    '/interventions/total-count-monthly',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getTotalEachMonthInterventionsCount,
  );

  app.get(
    '/interventions-profit/total-monthly',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getMonthlyInterventionsProfitTotalValue,
  );

  app.get(
    '/interventions-profit/total-anual',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getAnualInterventionsProfitTotalValue,
  );

  app.get(
    '/interventions-profit/total-anual-expected',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getAnualInterventionsProfitExpectedValue,
  );

  app.get(
    '/interventions-profit/each-month',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    getTotalEachMonthInterventionsProfit,
  );

  app.get(
    '/interventions/trash',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    getAllInterventionsTrashList,
  );

  app.get(
    '/interventions/resume-for-approval/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    generateResumeForApproval,
  );

  app.patch(
    '/interventions/approve-intervention/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE'])],
    },
    approveIntervention,
  );
}
