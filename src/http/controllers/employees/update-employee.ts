import { makeUpdateEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-update-employee-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateEmployeeProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmployeeBodySchema = z.object({
    name: z.string().optional(),
    cpf: z.string().optional(),
    rg: z.string().optional(),
    email: z.string().email().optional(),
    admission_at: z.coerce.date().optional(),
    phone: z.string().optional(),
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    salary: z.number().optional(),
  });
  const updateEmployeeProfileQuerySchema = z.object({
    employeeId: z.string(),
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
  } = updateEmployeeBodySchema.parse(request.body);

  const { employeeId } = updateEmployeeProfileQuerySchema.parse(request.params);

  try {
    const updateEmployeeProfile = makeUpdateEmployeeProfileUseCase();

    const updatedEmployee = await updateEmployeeProfile.execute({
      employeeId: employeeId,
      data: {
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
      },
    });

    return reply.status(200).send(updatedEmployee);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
