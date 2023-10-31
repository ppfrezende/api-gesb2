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
import { sumHourValues } from '@/utils/sumHourValues';

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
    basicInformation: { interventionDescription, isInternationalJob, site },
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

    const { timesheetdata } = await createTimeSheetData.execute({
      technician_id: technicianId,
      userName: user.name,
    });

    const dayHoursArray = day.map((item, index) => {
      return {
        day: new Date(convertDate(item.__EMPTY_1)),
        departure: convertHourToDecimal(departure[index].__EMPTY_3),
        arrival: convertHourToDecimal(arrival[index].__EMPTY_5),
        rangeAfrom: convertHourToDecimal(rangeAfrom[index].__EMPTY_7),
        rangeAto: convertHourToDecimal(rangeAto[index].__EMPTY_8),
        rangeBfrom: convertHourToDecimal(rangeBfrom[index].__EMPTY_10),
        rangeBto: convertHourToDecimal(rangeBto[index].__EMPTY_12),
        rangeCfrom: convertHourToDecimal(rangeCfrom[index].__EMPTY_13),
        rangeCto: convertHourToDecimal(rangeCto[index].__EMPTY_14),
        rangeDfrom: convertHourToDecimal(rangeDfrom[index].__EMPTY_15),
        rangeDto: convertHourToDecimal(rangeDto[index].__EMPTY_17),
        isOffshore: on_offshore[index].__EMPTY_25 === 'OffShore' ? true : false,
        technician_id: technicianId,
        timeSheetDataId: timesheetdata.id!,
      };
    });

    let departureDay = null;
    for (const item of dayHoursArray) {
      if (item.departure !== 0) {
        departureDay = item.day;
        break;
      }
    }

    let arrivalDay = null;
    for (const item of dayHoursArray) {
      if (item.arrival !== 0) {
        arrivalDay = item.day;
        break;
      }
    }

    const result = sumHourValues(dayHoursArray);

    const updatedTimeSheetData = await updateTimeSheetData.execute({
      timesheetdataId: timesheetdata.id!,
      data: {
        departure_date: departureDay,
        arrival_date: arrivalDay,
        technician_id: technicianId,
        traveled_hours: result.sumDepartureArrival,
        normal_hours_range_A: result.sumA,
        normal_hours_range_B: result.sumB,
        extra_hours_range_C: result.sumC,
        extra_hours_range_D: result.sumD,
        isInternational: isInternationalJob,
        intervention_description: interventionDescription,
        site: site,
      },
    });

    await createTimeSheetDays.execute(dayHoursArray);

    return reply.status(201).send({ updatedTimeSheetData });
  } catch (err) {
    console.log(err);
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
