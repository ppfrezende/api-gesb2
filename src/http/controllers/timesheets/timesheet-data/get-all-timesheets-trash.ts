import { FastifyRequest, FastifyReply } from 'fastify';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetTimeSheetDataTrashListUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-all-timesheets-trash-use-case';

export async function getTimeSheetDataTrashList(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getTimeSheetDataTrashListUseCase =
      makeGetTimeSheetDataTrashListUseCase();

    const { timesheetsdata, numberOfRegisters } =
      await getTimeSheetDataTrashListUseCase.execute();

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
