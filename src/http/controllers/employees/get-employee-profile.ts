import { makeGetEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-get-employee-profile-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function getEmployeeProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getEmployeeProfileQuerySchema = z.object({
    employeeId: z.string(),
  });

  const { employeeId } = getEmployeeProfileQuerySchema.parse(request.params);
  try {
    const getEmployeeProfile = makeGetEmployeeProfileUseCase();

    const { employee } = await getEmployeeProfile.execute({
      employeeId: employeeId,
    });

    return reply.status(200).send({
      employee,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
