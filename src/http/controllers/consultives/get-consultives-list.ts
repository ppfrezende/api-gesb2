import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetConsultivesListUseCase } from '@/use-cases/_factories/consultives_factories/make-get-consultives-list-use-case';

export async function getConsultivesList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getConsultivesQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getConsultivesQuerySchema.parse(request.query);

  try {
    const getConsultivesListUseCase = makeGetConsultivesListUseCase();

    const { consultives, numberOfRegisters } =
      await getConsultivesListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ consultives });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
