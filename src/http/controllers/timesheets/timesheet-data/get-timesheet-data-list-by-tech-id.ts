import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetTimeSheetDataByTechIdListUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-timesheetdata-list-by-tech-id-use-case';

export async function getTimeSheetDataListByTechId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getTimeSheetDataListQuerySchema = z.object({
    technicianId: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { technicianId, page } = getTimeSheetDataListQuerySchema.parse(
    request.params,
  );

  try {
    const getTimeSheetDataByTechIdListUseCase =
      makeGetTimeSheetDataByTechIdListUseCase();

    const { timesheetsdata, numberOfRegisters } =
      await getTimeSheetDataByTechIdListUseCase.execute({
        technicianId,
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
