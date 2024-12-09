import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDeleteTimeSheetDataUseCaseResponse } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-delete-timesheetdata-use-case';
import { makeDeleteTimeSheetDaysUseCaseResponse } from '@/use-cases/_factories/timesheets_factories/timesheetdays_factories/make-delete-timesheetdays-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';

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

    await deleteTimeSheetDays.execute({
      timesheetdataId,
    });

    await deleteTimeSheet.execute({
      timesheetdataId,
      deletedBy: userLoggedIn.name,
    });

    return reply.status(204).send();
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
