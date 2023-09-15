import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeRegisterServiceProviderUseCase } from '@/use-cases/_factories/service-providers_factories/make-register-service-provider-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function registerServiceProvider(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerServiceProviderBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    rg: z.string(),
    cnpj: z.string(),
    email: z.string().email(),
    contract_validity: z.coerce.date(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    uf: z.string(),
    normal_hour: z.number(),
    extra_hour: z.number(),
    day_hour: z.number(),
    contract_value: z.number(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    name,
    cpf,
    rg,
    cnpj,
    email,
    contract_validity,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    normal_hour,
    extra_hour,
    day_hour,
    contract_value,
  } = registerServiceProviderBodySchema.parse(request.body);

  try {
    const registerServiceProvider = makeRegisterServiceProviderUseCase();

    const { service_provider } = await registerServiceProvider.execute({
      name,
      cpf,
      rg,
      cnpj,
      email,
      contract_validity,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      normal_hour,
      extra_hour,
      day_hour,
      userEmail: user.email,
      contract_value,
    });

    return reply.status(201).send({
      service_provider,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
