import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
// import multer from 'fastify-multer';
// import uploadConfig from '@/config/upload';
import { FastifyInstance } from 'fastify';
import { createSelfEmployed } from './create-self-employed';
import { getSelfEmployeesList } from './get-self-employees-list';
import { getSelfEmployedProfile } from './get-self-employed-profile';
import { updateSelfEmployedProfile } from './update-self-employed';
import { searchSelfEmployees } from './search-self-employees';
import { deleteSelfEmployedProfile } from './delete-self-employed';

// const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

export async function selfEmployeesRoutes(app: FastifyInstance) {
  app.post(
    '/self-employees',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    createSelfEmployed,
  );

  app.get(
    '/self-employees',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getSelfEmployeesList,
  );

  app.get(
    '/self-employees/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    searchSelfEmployees,
  );

  app.put(
    '/self-employees/:selfEmployedId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    updateSelfEmployedProfile,
  );

  app.get(
    '/self-employees/:selfEmployedId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getSelfEmployedProfile,
  );

  app.delete(
    '/self-employees/:selfEmployedId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    deleteSelfEmployedProfile,
  );

  //   app.patch(
  //     '/service-providers/avatar/:id',
  //     {
  //       onRequest: [
  //         verifyJWT,
  //         verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
  //       ],
  //       preHandler: uploadAvatar.single('avatar'),
  //     },
  //     updateServiceProviderAvatar,
  //   );

  //   app.get(
  //     '/service-providers/trash',
  //     { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
  //     getServiceProvidersTrashList,
  //   );
}
