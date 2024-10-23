import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeRegisterEmployeeUseCase } from '@/use-cases/_factories/employee_factories/make-register-employee-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-create-technician-use-case';
import { makeGetTechnicianByRegistrationNumberUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technician-by-registration-number-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';

export async function registerEmployee(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerEmployeeBodySchema = z.object({
    name: z.string(),
    registration_number: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    admission_at: z.coerce.date(),
    phone: z.string(),
    cep: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    uf: z.string(),
    job_title: z.string(),
    skills: z.string(),
    salary: z.number(),
  });

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    name,
    registration_number,
    cpf,
    email,
    admission_at,
    phone,
    cep,
    street,
    number,
    complement,
    city,
    uf,
    job_title,
    salary,
    skills,
  } = registerEmployeeBodySchema.parse(request.body);

  try {
    const registerEmployee = makeRegisterEmployeeUseCase();
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

    const { employee } = await registerEmployee.execute({
      name,
      registration_number,
      cpf,
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
      job_title,
      userName: user.name,
      skills,
    });

    const { technician } = await createTechnician.execute({
      id: employee.id,
      name,
      email,
      job_title,
      registration_number,
      userName: user.name,
      skills,
    });

    return reply.status(201).send({
      employee,
      technician,
    });
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
