import { makeUpdateIsApprovedInvoiceToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-update-is-approved-invoice-to-customer';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateIsApprovedInvoiceToCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateIsApprovedInvoiceToCustomerBodySchema = z.object({
    isApproved: z.boolean(),
  });

  const updateIsApprovedInvoiceToCustomerQuerySchema = z.object({
    id: z.string(),
  });

  const { isApproved } = updateIsApprovedInvoiceToCustomerBodySchema.parse(
    request.body,
  );
  const { id } = updateIsApprovedInvoiceToCustomerQuerySchema.parse(
    request.params,
  );

  try {
    const updateIsApprovedInvoiceToCustomerUseCase =
      makeUpdateIsApprovedInvoiceToCustomerUseCase();

    await updateIsApprovedInvoiceToCustomerUseCase.execute({
      invoiceToCustomerId: id,
      data: {
        isApproved,
      },
    });

    return reply.status(200).send({ message: 'successfully updated' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
