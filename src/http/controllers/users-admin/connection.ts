import { FastifyReply, FastifyRequest } from 'fastify';

export async function testConnection(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    return reply.status(200).send({ message: 'Successfully Connection' });
  } catch (err) {
    if (err) {
      return reply.status(400).send({ message: err });
    }

    throw err;
  }
}
