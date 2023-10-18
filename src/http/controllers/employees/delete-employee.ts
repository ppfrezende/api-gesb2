import { makeDeleteEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-delete-employee-use-case';
import { makeDeleteTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-delete-technician-use-case';
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
    const deleteTechnician = makeDeleteTechnicianUseCase();

    await deleteEmployeeProfile.execute({
      employeeId: employeeId,
    });

    await deleteTechnician.execute({
      technicianId: employeeId,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
