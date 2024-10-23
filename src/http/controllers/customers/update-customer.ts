import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeUpdateCustomerUseCase } from '@/use-cases/_factories/customers_factories/make-update-customer-use-case';

export async function updateCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCustomerBodySchema = z.object({
    company_name: z.string().optional(),
    cnpj: z.string().optional(),
    cep: z.string().optional(),
    street: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    establishment_number: z.string().optional(),
    phone: z.string().optional(),
  });

  const updateCustomerQuerySchema = z.object({
    customerId: z.string(),
  });

  const {
    company_name,
    cnpj,
    cep,
    city,
    complement,
    establishment_number,
    phone,
    street,
    uf,
  } = updateCustomerBodySchema.parse(request.body);

  const { customerId } = updateCustomerQuerySchema.parse(request.params);

  try {
    const updateCustomer = makeUpdateCustomerUseCase();

    const updatedCustomer = await updateCustomer.execute({
      customerId: customerId,
      data: {
        company_name,
        cnpj,
        cep,
        city,
        complement,
        establishment_number,
        phone,
        street,
        uf,
      },
    });

    return reply.status(201).send(updatedCustomer);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
