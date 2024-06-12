import { makeUpdateServiceProviderProfileUseCase } from '@/use-cases/_factories/service-providers_factories/make-update-service-provider-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateServiceProviderProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateServiceProviderBodySchema = z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    registration_number: z.string().optional(),
    job_title: z.string().optional(),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    email: z.string().email().optional(),
    start_of_contract: z.coerce.date().optional(),
    contract_validity: z.coerce.date().optional(),
    phone: z.string().optional(),
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    contract_value: z.number().optional(),
    normal_hour: z.number().optional(),
    extra_hour: z.number().optional(),
    day_hour: z.number().optional(),
  });
  const updateServiceProviderProfileQuerySchema = z.object({
    serviceProviderId: z.string(),
  });

  const {
    name,
    company,
    registration_number,
    job_title,
    cpf,
    cnpj,
    email,
    start_of_contract,
    contract_validity,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
  } = updateServiceProviderBodySchema.parse(request.body);

  const { serviceProviderId } = updateServiceProviderProfileQuerySchema.parse(
    request.params,
  );

  try {
    const updateServiceProviderProfile =
      makeUpdateServiceProviderProfileUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();

    const updatedServiceProvider = await updateServiceProviderProfile.execute({
      serviceProviderId: serviceProviderId,
      data: {
        name,
        company,
        registration_number,
        job_title,
        cpf,
        cnpj,
        email,
        start_of_contract,
        contract_validity,
        phone,
        cep,
        street,
        number,
        complement,
        city,
        uf,
      },
    });

    const { updatedTechnician } = await updateTechnician.execute({
      technicianId: serviceProviderId,
      data: {
        name,
        email,
        registration_number,
        job_title,
      },
    });

    return reply
      .status(200)
      .send({ updatedServiceProvider, updatedTechnician });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
