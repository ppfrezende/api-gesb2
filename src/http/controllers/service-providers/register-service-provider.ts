import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeRegisterServiceProviderUseCase } from '@/use-cases/_factories/service-providers_factories/make-register-service-provider-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-create-technician-use-case';
import { makeGetTechnicianByRegistrationNumberUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technician-by-registration-number-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function registerServiceProvider(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerServiceProviderBodySchema = z.object({
    name: z.string(),
    company: z.string(),
    registration_number: z.string(),
    cpf: z.string(),
    cnpj: z.string(),
    email: z.string().email(),
    start_of_contract: z.coerce.date(),
    contract_validity: z.coerce.date(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    job_title: z.string(),
    uf: z.string(),
    skills: z.string(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    name,
    company,
    registration_number,
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
    job_title,
    skills,
  } = registerServiceProviderBodySchema.parse(request.body);

  try {
    const registerServiceProvider = makeRegisterServiceProviderUseCase();
    const createTechnician = makeCreateTechnicianUseCase();
    const getTechByRegistrationNumber =
      makeGetTechnicianByRegistrationNumberUseCase();

    let tech = null;

    try {
      const result = await getTechByRegistrationNumber.execute({
        registration_number,
      });
      tech = result.technician;
    } catch (err) {
      if (!(err instanceof ResourceNotFoundError)) {
        throw err;
      }
    }

    if (tech) {
      return reply.status(409).send({ message: 'Resource already exists' });
    }

    const { service_provider } = await registerServiceProvider.execute({
      name,
      company,
      registration_number,
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
      job_title,
      userId: user.id,
      skills,
    });

    const { technician } = await createTechnician.execute({
      id: service_provider.id,
      name,
      email,
      job_title,
      registration_number,
      userId: user.id,
      skills,
    });

    return reply.status(201).send({
      service_provider,
      technician,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
