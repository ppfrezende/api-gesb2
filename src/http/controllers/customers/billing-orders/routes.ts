import { verifyJWT } from '../../../middlewares/verify-jwt';
import { verifyUserRole } from '../../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createBillingOrder } from './create-billing-order';
import { deleteBillingOrder } from './delete-billing-order';
import { getBillingOrder } from './get-billing-order';
import { getBillingOrdersList } from './get-billing-orders-list';
import { searchBillingOrders } from './search-billing-orders';
import { updateBillingOrder } from './update-billing-order';

export async function billingOrdersRoutes(app: FastifyInstance) {
  app.post(
    '/billing-orders/:customerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    createBillingOrder,
  );

  app.get(
    '/billing-orders/search',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    searchBillingOrders,
  );

  app.put(
    '/billing-orders/:billingOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    updateBillingOrder,
  );

  app.get(
    '/billing-orders/:billingOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    getBillingOrder,
  );

  app.get(
    '/billing-orders',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    getBillingOrdersList,
  );

  app.delete(
    '/billing-orders/:billingOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'COMERCIAL', 'ADMIN'])],
    },
    deleteBillingOrder,
  );
}
