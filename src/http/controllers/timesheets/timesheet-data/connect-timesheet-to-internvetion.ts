import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeConnectTimeSheetToIntertventionUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-connect-timesheet-to-intervention-use-case';

export async function connectTimesheetToIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const connectTimesheetToInterventionQuerySchema = z.object({
    timesheetdataId: z.string(),
    interventionId: z.string(),
  });

  const { timesheetdataId, interventionId } =
    connectTimesheetToInterventionQuerySchema.parse(request.params);

  try {
    const connectTimesheetToInterventionUseCase =
      makeConnectTimeSheetToIntertventionUseCase();

    await connectTimesheetToInterventionUseCase.execute({
      timesheetdataId,
      interventionId,
    });

    return reply
      .status(200)
      .send({ message: 'connected timesheet to intervention' });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
