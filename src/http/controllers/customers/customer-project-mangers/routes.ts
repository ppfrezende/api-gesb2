import { verifyJWT } from '@/http/middlewares/verify-jwt';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { deleteCustomerProjectManager } from './delete-customer-project-manager';
import { updateCustomerProjectManager } from './update-customer-project-manager';
import { createCustomerProjectManager } from './create-customer-project-manager';

export async function customerProjectManegerRoutes(app: FastifyInstance) {
  app.delete(
    '/customer-project-manager/:customerProjectManagerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN', 'FINANCE']),
      ],
    },
    deleteCustomerProjectManager,
  );

  app.post(
    '/customer-project-manager/:customerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN', 'FINANCE']),
      ],
    },
    createCustomerProjectManager,
  );

  app.put(
    '/customer-project-manager/:customerProjectManagerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN', 'FINANCE']),
      ],
    },
    updateCustomerProjectManager,
  );
}
