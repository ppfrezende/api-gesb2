import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import multer from 'fastify-multer';
import uploadConfig from '@/config/upload';
import { FastifyInstance } from 'fastify';

import { registerServiceProvider } from '../service-providers/register-service-provider';
import { searchServiceProviders } from '../service-providers/search-service-providers';
import { updateServiceProviderProfile } from '../service-providers/update-service-provider-profile';
import { getServiceProviderProfile } from '../service-providers/get-service-provider-profile';
import { deleteServiceProviderProfile } from '../service-providers/delete-service-provider';
import { getServiceProvidersList } from '../service-providers/get-service-providers-list';
import { updateServiceProviderAvatar } from '../service-providers/update-avatar-service-provider';
import { getServiceProvidersTrashList } from './get-all-service-providers-trash';

const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

export async function serviceProvidersRoutes(app: FastifyInstance) {
  app.post(
    '/service-providers',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    registerServiceProvider,
  );

  app.get(
    '/service-providers/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    searchServiceProviders,
  );

  app.put(
    '/service-providers/:serviceProviderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    updateServiceProviderProfile,
  );

  app.get(
    '/service-providers/:serviceProviderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getServiceProviderProfile,
  );

  app.delete(
    '/service-providers/:serviceProviderId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    deleteServiceProviderProfile,
  );

  app.get(
    '/service-providers',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
    },
    getServiceProvidersList,
  );

  app.patch(
    '/service-providers/avatar/:id',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['SERVICE', 'ADMIN', 'FINANCE', 'RH']),
      ],
      preHandler: uploadAvatar.single('avatar'),
    },
    updateServiceProviderAvatar,
  );

  app.get(
    '/service-providers/trash',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    getServiceProvidersTrashList,
  );
}
