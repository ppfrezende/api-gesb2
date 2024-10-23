import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetCustomersListUseCase } from '@/use-cases/_factories/customers_factories/make-get-customers-list-use-case';

export async function getCustomersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCustomersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getCustomersListQuerySchema.parse(request.query);

  try {
    const getCustomersListUseCase = makeGetCustomersListUseCase();

    const { customers, numberOfRegisters, totalCount } =
      await getCustomersListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': totalCount })
      .headers({ 'x-page-count': numberOfRegisters })

      .send({ customers });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
