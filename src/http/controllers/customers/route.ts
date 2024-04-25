import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createCustomer } from './create-customer';
import { getCustomersList } from './get-customers-list';
import { deleteCustomer } from './delete-customer';
import { updateCustomer } from './update-customer';
import { getCustomer } from './get-customer';

export async function customersRoutes(app: FastifyInstance) {
  app.post(
    '/customers',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createCustomer,
  );

  app.get(
    '/customers',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getCustomersList,
  );

  app.get(
    '/customers/:customerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getCustomer,
  );

  app.put(
    '/customers/:customerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updateCustomer,
  );

  app.delete(
    '/customers/:customerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteCustomer,
  );
}
