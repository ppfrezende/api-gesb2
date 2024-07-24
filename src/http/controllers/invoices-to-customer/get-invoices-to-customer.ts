import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetInvoicesToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-get-invoices-to-customer-list-use-case';

export async function getInvoiceToCustomersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInvoiceToCustomersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getInvoiceToCustomersListQuerySchema.parse(request.query);

  try {
    const getInvoiceToCustomersListUseCase = makeGetInvoicesToCustomerUseCase();

    const { invoicesToCustomer, numberOfRegisters } =
      await getInvoiceToCustomersListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ invoicesToCustomer });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
