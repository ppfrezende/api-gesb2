import { makeDeleteEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-delete-employee-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

export async function deleteEmployeeProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteEmployeeProfileQuerySchema = z.object({
    employeeId: z.string(),
  });

  const { employeeId } = deleteEmployeeProfileQuerySchema.parse(request.params);

  try {
    const deleteEmployeeProfile = makeDeleteEmployeeProfileUseCase();

    await deleteEmployeeProfile.execute({
      employeeId: employeeId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
