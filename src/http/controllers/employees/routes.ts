import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import multer from 'fastify-multer';
import uploadConfig from '@/config/upload';
import { FastifyInstance } from 'fastify';

import { registerEmployee } from '../employees/register-employee';
import { getEmployeeProfile } from '../employees/get-employee-profile';
import { getEmployeesList } from '../employees/get-employees-list';
import { updateEmployeeProfile } from '../employees/update-employee';
import { deleteEmployeeProfile } from '../employees/delete-employee';
import { searchEmployees } from '../employees/search-employee';
import { updateEmployeeAvatar } from '../employees/update-avatar-employee';

const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

export async function employeesRoutes(app: FastifyInstance) {
  app.post(
    '/employees',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    registerEmployee,
  );

  app.get(
    '/employees/:employeeId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    getEmployeeProfile,
  );

  app.get(
    '/employees',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    getEmployeesList,
  );

  app.put(
    '/employees/:employeeId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    updateEmployeeProfile,
  );

  app.delete(
    '/employees/:employeeId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    deleteEmployeeProfile,
  );

  app.get(
    '/employees/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
    },
    searchEmployees,
  );

  app.patch(
    '/employees/avatar/:id',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole(['RH', 'SERVICE', 'ADMIN', 'FINANCE']),
      ],
      preHandler: uploadAvatar.single('avatar'),
    },
    updateEmployeeAvatar,
  );
}
