import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetApprovedInvoicesToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-get-approved-invoices-to-customer';

export async function getApprovedInvoiceToCustomersList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getApprovedInvoiceToCustomersListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getApprovedInvoiceToCustomersListQuerySchema.parse(
    request.query,
  );

  try {
    const getApprovedInvoiceToCustomersListUseCase =
      makeGetApprovedInvoicesToCustomerUseCase();

    const { invoicesToCustomer, numberOfRegisters } =
      await getApprovedInvoiceToCustomersListUseCase.execute({
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
