import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteTimeSheetDataUseCaseResponse } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-delete-timesheetdata-use-case';
import { makeDeleteTimeSheetDaysUseCaseResponse } from '@/use-cases/_factories/timesheets_factories/timesheetdays_factories/make-delete-timesheetdays-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeGetTimeSheetDataUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-timesheetdata-use-case';
import { ResourceCannotBeDeletedError } from '@/use-cases/errors/resource-cannot-be-deleted';

export async function deleteTimeSheet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteTimeSheetQuerySchema = z.object({
    timesheetdataId: z.string(),
  });

  const { timesheetdataId } = deleteTimeSheetQuerySchema.parse(request.params);

  const getUserProfile = makeGetUserProfileUseCase();

  const { user: userLoggedIn } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  try {
    const deleteTimeSheetDays = makeDeleteTimeSheetDaysUseCaseResponse();
    const deleteTimeSheet = makeDeleteTimeSheetDataUseCaseResponse();
    const getTimesheetdata = makeGetTimeSheetDataUseCase();

    const { timesheetdata } = await getTimesheetdata.execute({
      timesheetdataId,
    });

    if (timesheetdata.interventionId !== null) {
      throw new ResourceCannotBeDeletedError();
    } else {
      await deleteTimeSheetDays.execute({
        timesheetdataId,
      });

      await deleteTimeSheet.execute({
        timesheetdataId,
        deletedBy: userLoggedIn.name,
      });
    }

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceCannotBeDeletedError) {
      return reply.status(403).send({ message: err.message });
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
