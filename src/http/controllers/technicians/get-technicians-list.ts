import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetTechniciansListUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technicians-list-use-case';

export async function getTechniciansList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTechniciansListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getTechniciansListQuerySchema.parse(request.query);

  try {
    const getTechniciansListUseCase = makeGetTechniciansListUseCase();

    const { technicians, numberOfRegisters } =
      await getTechniciansListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ technicians });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
