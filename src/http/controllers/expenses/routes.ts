import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createExpensesByTechParam } from './create-expenses-by-tech-param';
import { createExpensesByIntervention } from './create-expenses-by-intervention';
import { deleteExpense } from './delete-expense';
import { getExpensesByTechId } from './get-expenses-by-tech-id';
import { getExpensesByInterventionId } from './get-expenses-by-intervention-id';
import { getAllExpenses } from './get-expenses';

export async function expensesRoutes(app: FastifyInstance) {
  app.post(
    '/technician/expenses/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createExpensesByTechParam,
  );

  app.post(
    '/interventions/expenses/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createExpensesByIntervention,
  );

  app.delete(
    '/expenses/:expenseId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteExpense,
  );

  app.get(
    '/technician/expenses/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getExpensesByTechId,
  );

  app.get(
    '/intervention/expenses/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getExpensesByInterventionId,
  );

  app.get(
    '/expenses',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getAllExpenses,
  );
}
