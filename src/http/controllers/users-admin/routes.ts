import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import multer from 'fastify-multer';
import uploadConfig from '@/config/upload';
import { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate';
import { refreshToken } from './refreshToken';
import { registerUsers } from './register-users';
import { searchUsers } from './search-user';
import { userSelfProfile } from './user-self-profile';
import { getUsersList } from './get-users-list';
import { getUserProfile } from './get-user-profile';
import { deleteUserProfile } from './delete-user';
import { updateUserProfile } from './update-user';
import { updateUserAvatar } from './update-avatar-user';

const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

export async function usersRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate);
  app.patch('/token/refresh', refreshToken);

  app.patch(
    '/users/avatar/:id',
    {
      onRequest: [verifyJWT, verifyUserRole('ADMIN')],
      preHandler: uploadAvatar.single('avatar'),
    },
    updateUserAvatar,
  );

  app.post(
    '/users',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    registerUsers,
  );
  app.delete(
    '/users/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    deleteUserProfile,
  );
  app.put(
    '/users/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    updateUserProfile,
  );
  app.get(
    '/users',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    getUsersList,
  );
  app.get(
    '/users/:id',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    getUserProfile,
  );
  app.get(
    '/users/search',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    searchUsers,
  );
  app.get(
    '/me',
    { onRequest: [verifyJWT, verifyUserRole('ADMIN')] },
    userSelfProfile,
  );
}
