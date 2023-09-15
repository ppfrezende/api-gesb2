import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeRegisterEmployeeUseCase } from '@/use-cases/_factories/employee_factories/make-register-employee-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

export async function registerEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerEmployeeBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    rg: z.string(),
    email: z.string().email(),
    admission_at: z.coerce.date(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    uf: z.string(),
    salary: z.number(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    name,
    cpf,
    rg,
    email,
    admission_at,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    salary,
  } = registerEmployeeBodySchema.parse(request.body);

  try {
    const registerEmployee = makeRegisterEmployeeUseCase();

    const { employee } = await registerEmployee.execute({
      name,
      cpf,
      rg,
      email,
      admission_at,
      phone,
      cep,
      street,
      number,
      complement,
      city,
      uf,
      userEmail: user.email,
      salary,
    });

    return reply.status(201).send({
      employee,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
