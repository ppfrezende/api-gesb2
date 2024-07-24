import { makeGetNotApprovedInvoicesToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-get-not-approved-invoices-to-customer';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getNotApprovedInvoiceToCustomersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getNotApprovedInvoiceToCustomersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getNotApprovedInvoiceToCustomersListQuerySchema.parse(
    request.query,
  );

  try {
    const getNotApprovedInvoiceToCustomersListUseCase =
      makeGetNotApprovedInvoicesToCustomerUseCase();

    const { invoicesToCustomer, numberOfRegisters } =
      await getNotApprovedInvoiceToCustomersListUseCase.execute({
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
