import { verifyJWT } from '../../../middlewares/verify-jwt';
import { verifyUserRole } from '../../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { createTechnicianExpenses } from './create-technician-expenses';
import { deleteTechnicianExpense } from './delete-technician-expense';
import { getTechnicianExpensesListByTechnicianId } from './get-technician-expenses-by-technician-id';
import { getTechnicianExpensesList } from './get-technician-expenses';

export async function technicianExpensesRoutes(app: FastifyInstance) {
  app.post(
    '/technician-expenses/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createTechnicianExpenses,
  );

  app.delete(
    '/technician-expenses/:technicianExpenseId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteTechnicianExpense,
  );

  app.get(
    '/technician-expenses/:technicianId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getTechnicianExpensesListByTechnicianId,
  );

  app.get(
    '/technician-expenses',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getTechnicianExpensesList,
  );
}
