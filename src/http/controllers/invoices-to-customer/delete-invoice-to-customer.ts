import { makeDeleteInvoiceToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-delete-invoice-to-customer-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteInvoiceToCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteInvoiceToCustomerQuerySchema = z.object({
    invoiceToCustomerId: z.string(),
  });

  const { invoiceToCustomerId } = deleteInvoiceToCustomerQuerySchema.parse(
    request.params,
  );

  try {
    const deleteInvoiceToCustomerUseCase = makeDeleteInvoiceToCustomerUseCase();

    await deleteInvoiceToCustomerUseCase.execute({
      invoiceToCustomerId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
