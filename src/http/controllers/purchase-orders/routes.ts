import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createPurchaseOrder } from './create-purchase-order';
import { deletePurchaseOrder } from './delete-purchase-order';
import { getPurchaseOrder } from './get-purchase-order';
import { getPurchaseOrdersList } from './get-purchase-orders-list';
import { searchPurchaseOrders } from './search-purchase-orders';
import { updatePurchaseOrder } from './update-purchase-order';
import { deleteSkill } from './delete-skill';

export async function purchaseOrdersRoutes(app: FastifyInstance) {
  app.post(
    '/purchase-orders',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createPurchaseOrder,
  );

  app.get(
    '/purchase-orders/search',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    searchPurchaseOrders,
  );

  app.put(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updatePurchaseOrder,
  );

  app.get(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getPurchaseOrder,
  );

  app.get(
    '/purchase-orders',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getPurchaseOrdersList,
  );

  app.delete(
    '/purchase-orders/:purchaseOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deletePurchaseOrder,
  );

  app.delete(
    '/skills/:skillId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteSkill,
  );
}
