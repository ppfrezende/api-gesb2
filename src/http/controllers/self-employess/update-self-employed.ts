import { makeUpdateSelfEmployedProfileUseCase } from '@/use-cases/_factories/self-employees_factories/make-update-self-employed-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateSelfEmployedProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateSelfEmployedBodySchema = z.object({
    name: z.string().optional(),
    registration_number: z.string().optional(),
    job_title: z.string().optional(),
    document_type: z.string().optional(),
    document_number: z.string().optional(),
    email: z.string().email().optional(),
    start_of_contract: z.coerce.date().optional(),
    contract_validity: z.coerce.date().optional(),
    dismissed_at: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
    phone: z.string().optional(),
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    skills: z.string().optional(),
  });
  const updateSelfEmployedProfileQuerySchema = z.object({
    selfEmployedId: z.string(),
  });

  const {
    name,
    registration_number,
    job_title,
    document_type,
    document_number,
    email,
    start_of_contract,
    contract_validity,
    dismissed_at,
    isActive,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    skills,
  } = updateSelfEmployedBodySchema.parse(request.body);

  const { selfEmployedId } = updateSelfEmployedProfileQuerySchema.parse(
    request.params,
  );

  try {
    const updateSelfEmployedProfile = makeUpdateSelfEmployedProfileUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const updatedSelfEmployed = await updateSelfEmployedProfile.execute({
      selfEmployedId: selfEmployedId,
      updatedBy: userLoggedIn.name,
      data: {
        name,
        registration_number,
        job_title,
        document_type,
        document_number,
        email,
        start_of_contract,
        contract_validity,
        dismissed_at,
        isActive,
        phone,
        cep,
        street,
        number,
        complement,
        city,
        uf,
        skills,
      },
    });

    const { updatedTechnician } = await updateTechnician.execute({
      technicianId: selfEmployedId,
      updatedBy: userLoggedIn.name,
      data: {
        name,
        email,
        registration_number,
        isActive,
        job_title,
        skills,
      },
    });

    return reply.status(200).send({ updatedSelfEmployed, updatedTechnician });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
