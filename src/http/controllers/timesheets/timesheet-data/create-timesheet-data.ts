import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { createTimeSheetDataBodySchema } from './schemas/create-timesheet-data-schema';
import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { makeCreateTimeSheetDaysUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdays_factories/make-create-timesheetdays-use-case';
import { convertHourToDecimal } from '@/utils/convertHour';
import { convertDate } from '@/utils/convertDate';
import { makeCreateTimeSheetDataUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-create-timesheedata-use-case';
import { makeUpdateTimeSheetDataUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-update-timesheetdata-use-case';
import { serialNumberToDate } from '@/utils/serialNumberToDate';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetTechnicianUseCase } from '@/use-cases/_factories/technicians_factories/make-get-technician-use-case';

export async function createTimeSheetData(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserProfile = makeGetUserProfileUseCase();
  const getTechnicianQuerySchema = z.object({
    technicianId: z.string(),
  });

  const { technicianId } = getTechnicianQuerySchema.parse(request.params);

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const {
    basicInformation: {
      interventionNumber,
      isInternational,
      firstDate,
      secondDate,
    },
    dayHoursDataArray: {
      day,
      departure,
      arrival,
      rangeAfrom,
      rangeAto,
      rangeBfrom,
      rangeBto,
      rangeCfrom,
      rangeCto,
      rangeDfrom,
      rangeDto,
      on_offshore,
    },
  } = createTimeSheetDataBodySchema.parse(request.body);

  try {
    const createTimeSheetDays = makeCreateTimeSheetDaysUseCase();
    const createTimeSheetData = makeCreateTimeSheetDataUseCase();
    const updateTimeSheetData = makeUpdateTimeSheetDataUseCase();
    const getTechnicianUseCase = makeGetTechnicianUseCase();

    await getTechnicianUseCase.execute({
      technicianId,
    });

    const { timesheetdata } = await createTimeSheetData.execute({
      technicianId,
      userId: user.id,
    });

    const dayHoursArray = day
      .map((item, index) => {
        const departureDecimal = convertHourToDecimal(
          departure[index].__EMPTY_3,
        );
        const arrivalDecimal = convertHourToDecimal(arrival[index].__EMPTY_5);
        const rangeAfromDecimal =
          rangeAfrom[index].__EMPTY_7 === '00:00h'
            ? convertHourToDecimal('00:01h')
            : convertHourToDecimal(rangeAfrom[index].__EMPTY_7);
        const rangeAtoDecimal = convertHourToDecimal(rangeAto[index].__EMPTY_8);
        const rangeBfromDecimal = convertHourToDecimal(
          rangeBfrom[index].__EMPTY_10,
        );
        const rangeBtoDecimal = convertHourToDecimal(
          rangeBto[index].__EMPTY_12,
        );
        const rangeCfromDecimal = convertHourToDecimal(
          rangeCfrom[index].__EMPTY_13,
        );
        const rangeCtoDecimal = convertHourToDecimal(
          rangeCto[index].__EMPTY_14,
        );
        const rangeDfromDecimal = convertHourToDecimal(
          rangeDfrom[index].__EMPTY_15,
        );
        const rangeDtoDecimal = convertHourToDecimal(
          rangeDto[index].__EMPTY_17,
        );

        return {
          day: new Date(convertDate(item.__EMPTY_1)),
          departure: departureDecimal,
          arrival: arrivalDecimal,
          rangeAfrom: rangeAfromDecimal,
          rangeAto: rangeAtoDecimal,
          rangeBfrom: rangeBfromDecimal,
          rangeBto: rangeBtoDecimal,
          rangeCfrom: rangeCfromDecimal,
          rangeCto: rangeCtoDecimal,
          rangeDfrom: rangeDfromDecimal,
          rangeDto: rangeDtoDecimal,
          isOffshore:
            on_offshore[index].__EMPTY_25 === 'OffShore'
              ? true
              : on_offshore[index].__EMPTY_25 === 'OnShore'
              ? false
              : undefined,
          technicianId: technicianId,
          timeSheetDataId: timesheetdata.id!,
        };
      })
      .filter((item) => {
        return !(
          item.departure === null &&
          item.arrival === null &&
          item.rangeAfrom === null &&
          item.rangeAto === null &&
          item.rangeBfrom === null &&
          item.rangeBto === null &&
          item.rangeCfrom === null &&
          item.rangeCto === null &&
          item.rangeDfrom === null &&
          item.rangeDto === null
        );
      });

    const updatedTimeSheetData = await updateTimeSheetData.execute({
      timesheetdataId: timesheetdata.id!,
      updatedBy: user.name,
      data: {
        first_date: serialNumberToDate(firstDate),
        second_date: serialNumberToDate(secondDate),
        isInternational: isInternational,
        intervention_number: interventionNumber,
      },
    });

    await createTimeSheetDays.execute(dayHoursArray);

    return reply.status(201).send(updatedTimeSheetData);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
