import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createPurchaseOrder } from './create-purchase-order';
import { deletePurchaseOrder } from './delete-purchase-order';
import { getPurchaseOrder } from './get-purchase-order';
import { getPurchaseOrdersList } from './get-purchase-orders-list';
import { searchPurchaseOrders } from './search-purchase-orders';
import { updatePurchaseOrder } from './update-purchase-order';

export async function purchaseOrdersRoutes(app: FastifyInstance) {
  app.post(
    '/purchase-orders',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    createPurchaseOrder,
  );

  app.get(
    '/purchase-orders/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    searchPurchaseOrders,
  );

  app.put(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    updatePurchaseOrder,
  );

  app.get(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getPurchaseOrder,
  );

  app.get(
    '/purchase-orders',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getPurchaseOrdersList,
  );

  app.delete(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    deletePurchaseOrder,
  );
}
