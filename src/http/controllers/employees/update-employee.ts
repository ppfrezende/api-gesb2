import { makeUpdateEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-update-employee-profile-use-case';
import { makeUpdateTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-update-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function updateEmployeeProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmployeeBodySchema = z.object({
    name: z.string().optional(),
    registration_number: z.string().optional(),
    cpf: z.string().optional(),
    email: z.string().email().optional(),
    admission_at: z.coerce.date().optional(),
    dismissed_at: z.coerce.date().optional(),
    isActive: z.boolean().optional(),
    phone: z.string().optional(),
    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    city: z.string().optional(),
    uf: z.string().optional(),
    job_title: z.string().optional(),
    skills: z.string().optional(),
    salary: z.number().optional(),
  });
  const updateEmployeeProfileQuerySchema = z.object({
    employeeId: z.string(),
  });

  const {
    name,
    registration_number,
    cpf,
    email,
    admission_at,
    dismissed_at,
    isActive,
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
  } = updateEmployeeBodySchema.parse(request.body);

  const { employeeId } = updateEmployeeProfileQuerySchema.parse(request.params);

  try {
    const updateEmployeeProfile = makeUpdateEmployeeProfileUseCase();
    const updateTechnician = makeUpdateTechnicianUseCase();

    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const { updatedEmployee } = await updateEmployeeProfile.execute({
      employeeId: employeeId,
      updatedBy: userLoggedIn.name,
      data: {
        name,
        registration_number,
        cpf,
        email,
        admission_at,
        dismissed_at,
        isActive,
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
      },
    });

    const { updatedTechnician } = await updateTechnician.execute({
      technicianId: employeeId,
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

    return reply.status(200).send({ updatedEmployee, updatedTechnician });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
