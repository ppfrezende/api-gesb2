import { makeDeleteEmployeeProfileUseCase } from '@/use-cases/_factories/employee_factories/make-delete-employee-use-case';
import { makeGetInterventionByTechUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-by-tech-use-case';
import { makeDeleteTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-delete-technician-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';
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
    const deleteEmployeeProfileUseCase = makeDeleteEmployeeProfileUseCase();
    const getInterventionByTechUseCase = makeGetInterventionByTechUseCase();
    const deleteTechnicianUseCase = makeDeleteTechnicianUseCase();
    const getUserProfile = makeGetUserProfileUseCase();

    const { user: userLoggedIn } = await getUserProfile.execute({
      userId: request.user.sub,
    });

    const isLinked = await getInterventionByTechUseCase.execute({
      technicianId: employeeId,
    });

    if (isLinked.intervention !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteEmployeeProfileUseCase.execute({
        employeeId: employeeId,
        deletedBy: userLoggedIn.name,
      });

      await deleteTechnicianUseCase.execute({
        technicianId: employeeId,
        deletedBy: userLoggedIn.name,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }

    throw err;
  }
}
