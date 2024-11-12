import { verifyJWT } from '../../../middlewares/verify-jwt';
import { verifyUserRole } from '../../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { createInterventionExpenses } from './create-intervention-expenses';
import { deleteInterventionExpense } from './delete-intervention-expense';
import { getInterventionExpensesListByInterventionId } from './get-intervention-expenses-by-intervention-id';
import { getInterventionExpensesList } from './get-intervention-expenses';
import { getMonthlyInterventionsExpensesTotalValue } from './get-total-monthly-interventions-expenses';
import { getAnualInterventionsExpensesTotalValue } from './get-total-anual-interventions-expenses';
import { getTotalEachMonthInterventionsExpenses } from './get-total-each-month-interventions-expenses';

export async function interventionExpensesRoutes(app: FastifyInstance) {
  app.post(
    '/intervention-expenses/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createInterventionExpenses,
  );

  app.delete(
    '/intervention-expenses/:interventionExpenseId/:interventionId',
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
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getInterventionExpensesList,
  );

  app.get(
    '/interventions-expenses/total-monthly',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getMonthlyInterventionsExpensesTotalValue,
  );

  app.get(
    '/interventions-expenses/total-anual',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getAnualInterventionsExpensesTotalValue,
  );

  app.get(
    '/interventions-expenses/each-month',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getTotalEachMonthInterventionsExpenses,
  );
}
