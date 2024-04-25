import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { deleteCustomerProjectManager } from './delete-customer-project-manager';
import { updateCustomerProjectManager } from './update-customer-project-manager';
import { createCustomerProjectManager } from './create-customer-project-manager';

export async function customerProjectManegerRoutes(app: FastifyInstance) {
  app.delete(
    '/customer-project-manager/:customerProjectManagerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteCustomerProjectManager,
  );

  app.post(
    '/customer-project-manager/:customerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createCustomerProjectManager,
  );

  app.put(
    '/customer-project-manager/:customerProjectManagerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updateCustomerProjectManager,
  );
}
