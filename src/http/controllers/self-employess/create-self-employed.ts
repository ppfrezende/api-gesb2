import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-create-technician-use-case';
import { makeGetTechnicianByRegistrationNumberUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technician-by-registration-number-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeCreateSelfEmployedUseCase } from '@/use-cases/_factories/self-employees_factories/make-create-self-employed-use-case';

export async function createSelfEmployed(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createSelfEmployedBodySchema = z.object({
    name: z.string(),
    registration_number: z.string(),
    document_type: z.string(),
    document_number: z.string(),
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
    registration_number,
    document_type,
    document_number,
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
  } = createSelfEmployedBodySchema.parse(request.body);

  try {
    const createSelfEmployedUseCase = makeCreateSelfEmployedUseCase();
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

    const { self_employed } = await createSelfEmployedUseCase.execute({
      name,
      registration_number,
      document_type,
      document_number,
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
      id: self_employed.id,
      name,
      email,
      job_title,
      registration_number,
      userId: user.id,
      skills,
    });

    return reply.status(201).send({
      self_employed,
      technician,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
