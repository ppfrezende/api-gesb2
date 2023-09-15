import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';

import { createProject } from '../projects/create-project';
import { searchProjects } from '../projects/search-projects';
import { updateProject } from '../projects/update-project';
import { getProject } from '../projects/get-project';
import { getProjectsList } from '../projects/get-projects-list';
import { deleteProject } from '../projects/delete-project';

export async function projectsRoutes(app: FastifyInstance) {
  app.post(
    '/projects',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    createProject,
  );

  app.get(
    '/projects/search',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    searchProjects,
  );

  app.put(
    '/projects/:projectId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    updateProject,
  );

  app.get(
    '/projects/:projectId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getProject,
  );

  app.get(
    '/projects',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    getProjectsList,
  );

  app.delete(
    '/projects/:projectId',
    {
      onRequest: [
        verifyJWT,
        verifyUserRole('SERVICE') && verifyUserRole('ADMIN'),
      ],
    },
    deleteProject,
  );
}
