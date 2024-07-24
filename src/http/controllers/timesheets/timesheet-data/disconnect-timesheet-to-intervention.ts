import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDisconnectTimeSheetToInterventionUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-disconnect-timesheet-to-intervention-use-case';

export async function disconnectTimesheetToIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const disconnectTimesheetToInterventionQuerySchema = z.object({
    timesheetdataId: z.string(),
  });

  const { timesheetdataId } =
    disconnectTimesheetToInterventionQuerySchema.parse(request.params);

  try {
    const disconnectTimesheetToInterventionUseCase =
      makeDisconnectTimeSheetToInterventionUseCase();

    await disconnectTimesheetToInterventionUseCase.execute({
      timesheetdataId,
    });

    return reply
      .status(200)
      .send({ message: 'disconnected timesheet to intervention' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
