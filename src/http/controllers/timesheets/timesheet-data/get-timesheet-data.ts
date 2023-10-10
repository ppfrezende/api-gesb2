import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetTimeSheetDataUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-timesheetdata-use-case';

export async function getTimeSheet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTimeSheetQuerySchema = z.object({
    timesheetdataId: z.string(),
  });

  const { timesheetdataId } = getTimeSheetQuerySchema.parse(request.params);

  try {
    const getTimeSheet = makeGetTimeSheetDataUseCase();

    const timesheetdata = await getTimeSheet.execute({
      timesheetdataId,
    });

    return reply.status(200).send(timesheetdata);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
