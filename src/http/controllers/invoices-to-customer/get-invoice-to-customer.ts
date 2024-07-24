import { makeGetInvoiceToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-get-invoice-to-customer-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getInvoiceToCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInvoiceToCustomerQuerySchema = z.object({
    id: z.string(),
  });

  const { id } = getInvoiceToCustomerQuerySchema.parse(request.params);

  try {
    const getInvoiceToCustomer = makeGetInvoiceToCustomerUseCase();

    const { invoiceToCustomer } = await getInvoiceToCustomer.execute({
      invoiceToCustomerId: id,
    });

    return reply.status(200).send({
      invoiceToCustomer,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
