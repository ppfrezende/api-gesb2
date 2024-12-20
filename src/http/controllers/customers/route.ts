import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createCustomer } from './create-customer';
import { getCustomersList } from './get-customers-list';
import { deleteCustomer } from './delete-customer';
import { updateCustomer } from './update-customer';
import { getCustomer } from './get-customer';
import { searchCustomers } from './search-customers';
import { getAllCustomersList } from './get-all-customers';
import { getAllCustomersTrashList } from './get-all-customers-trash';

export async function customersRoutes(app: FastifyInstance) {
  app.post(
    '/customers',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    createCustomer,
  );

  app.get(
    '/customers',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    getCustomersList,
  );

  app.get(
    '/all-customers',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    getAllCustomersList,
  );

  app.get(
    '/customers/:customerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    getCustomer,
  );

  app.get(
    '/customers/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    searchCustomers,
  );

  app.put(
    '/customers/:customerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    updateCustomer,
  );

  app.delete(
    '/customers/:customerId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['COMERCIAL', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    deleteCustomer,
  );

  app.get(
    '/customers/trash',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    getAllCustomersTrashList,
  );
}
