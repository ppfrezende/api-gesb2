import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetTimeSheetDataListUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-timesheetdata-list-use-case';

export async function getTimeSheetDataList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTimeSheetDataListQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = getTimeSheetDataListQuerySchema.parse(request.params);

  try {
    const getTimeSheetDataListUseCase = makeGetTimeSheetDataListUseCase();

    const { timesheetsdata, numberOfRegisters } =
      await getTimeSheetDataListUseCase.execute({
        page,
      });

    return reply
      .status(200)
      .headers({ 'x-total-count': numberOfRegisters })

      .send({ timesheetsdata });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
