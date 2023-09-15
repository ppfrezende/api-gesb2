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

const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

export async function serviceProvidersRoutes(app: FastifyInstance) {
  app.post(
    '/service-providers',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    registerServiceProvider,
  );

  app.get(
    '/service-providers/search',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    searchServiceProviders,
  );

  app.put(
    '/service-providers/:serviceProviderId',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    updateServiceProviderProfile,
  );

  app.get(
    '/service-providers/:serviceProviderId',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    getServiceProviderProfile,
  );

  app.delete(
    '/service-providers/:serviceProviderId',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    deleteServiceProviderProfile,
  );

  app.get(
    '/service-providers',
    { onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')] },
    getServiceProvidersList,
  );

  app.patch(
    '/service-providers/avatar/:id',
    {
      onRequest: [verifyJWT, verifyUserRole('RH') && verifyUserRole('ADMIN')],
      preHandler: uploadAvatar.single('avatar'),
    },
    updateServiceProviderAvatar,
  );
}
