import { Role } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(roleToVeriry: Role) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (role !== roleToVeriry) {
      return reply.status(401).send({ message: 'Unauthorized' });
    }
  };
}
