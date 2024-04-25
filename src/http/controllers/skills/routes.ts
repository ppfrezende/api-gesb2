import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { deleteSkill } from './delete-skill';
import { createSkill } from './create-skill';
import { updateSkill } from './update-skill';

export async function skillsRoutes(app: FastifyInstance) {
  app.post(
    '/skills/:purchaseOrderId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    createSkill,
  );

  app.delete(
    '/skills/:skillId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteSkill,
  );

  app.put(
    '/skills/:skillId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    updateSkill,
  );
}
