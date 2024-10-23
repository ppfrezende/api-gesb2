import { verifyJWT } from '../../../middlewares/verify-jwt';
import { verifyUserRole } from '../../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { createInterventionExpenses } from './create-intervention-expenses';
import { deleteInterventionExpense } from './delete-intervention-expense';
import { getInterventionExpensesListByInterventionId } from './get-intervention-expenses-by-intervention-id';
import { getInterventionExpensesList } from './get-intervention-expenses';

export async function interventionExpensesRoutes(app: FastifyInstance) {
  app.post(
    '/intervention-expenses/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createInterventionExpenses,
  );

  app.delete(
    '/intervention-expenses/:interventionExpenseId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteInterventionExpense,
  );

  app.get(
    '/intervention-expenses/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getInterventionExpensesListByInterventionId,
  );

  app.get(
    '/intervention-expenses',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getInterventionExpensesList,
  );
}
