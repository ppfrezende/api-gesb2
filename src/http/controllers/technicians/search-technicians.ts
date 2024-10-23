import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeSearchTechniciansUseCase } from '@/use-cases/_factories/technicians_factories/make-search-technicians-use-case';

export async function searchTechnicians(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const searchTechniciansQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { q, page } = searchTechniciansQuerySchema.parse(request.query);

  try {
    const searchTechniciansUseCase = makeSearchTechniciansUseCase();

    const { technicians, numberOfRegisters } =
      await searchTechniciansUseCase.execute({
        query: q,
        page,
      });

    return reply
      .status(200)
      .headers({
        'x-page-count': numberOfRegisters,
      })
      .send({
        technicians,
      });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
