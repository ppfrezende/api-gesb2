import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeDisconnectTimeSheetToInterventionUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-disconnect-timesheet-to-intervention-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { makeGetTimeSheetDataUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-get-timesheetdata-use-case';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';

export async function disconnectTimesheetToIntervention(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const disconnectTimesheetToInterventionQuerySchema = z.object({
    timesheetdataId: z.string(),
    interventionId: z.string(),
  });

  const { timesheetdataId, interventionId } =
    disconnectTimesheetToInterventionQuerySchema.parse(request.params);

  try {
    const disconnectTimesheetToInterventionUseCase =
      makeDisconnectTimeSheetToInterventionUseCase();
    const getInterventionUseCase = makeGetInterventionUseCase();
    const getTimesheetdataUseCase = makeGetTimeSheetDataUseCase();
    const updateInterventionUseCase = makeUpdateInterventionUseCase();

    const { intervention } = await getInterventionUseCase.execute({
      interventionId,
    });
    const { timesheetdata } = await getTimesheetdataUseCase.execute({
      timesheetdataId,
    });

    if (
      intervention.isMonthly === false &&
      intervention.BillingOrder !== undefined
    ) {
      const calculatedDayHoursArray = timesheetdata.timesheetdays!.map(
        (day) => {
          const values = [
            day.rangeAfrom,
            day.rangeAto,
            day.rangeBfrom,
            day.rangeBto,
            day.rangeCfrom,
            day.rangeCto,
            day.rangeDfrom,
            day.rangeDto,
          ].filter((value) => value !== null);

          const minHour = Math.min(...values);
          const maxHour = Math.max(...values);

          const rangeSums = [
            day.rangeAto! - day.rangeAfrom!,
            day.rangeBto! - day.rangeBfrom!,
            day.rangeCto! - day.rangeCfrom!,
            day.rangeDto! - day.rangeDfrom!,
          ]
            .filter((value) => !isNaN(value))
            .reduce((acc, val) => acc + val, 0);

          const morningNightHoursLimit = 0.25;
          const eveningNightHoursLimit = 0.9166666666666666;
          const normalHoursOnshore = 0.333333333333333;
          const normalHoursOffshore = 0.5;

          let additionalNightHours = 0;
          let normalHours = 0;
          let normalHoursValue = 0;
          let extraHours = 0;
          let extraHoursValue = 0;

          if (minHour <= morningNightHoursLimit) {
            additionalNightHours += morningNightHoursLimit - minHour;
          }

          if (maxHour >= eveningNightHoursLimit) {
            additionalNightHours += maxHour - eveningNightHoursLimit;
          }

          const additionalNightHoursValue =
            additionalNightHours *
            24 *
            (day.isOffshore === true
              ? intervention.BillingOrder!.offshore_night_hour_value
              : intervention.BillingOrder!.onshore_night_hour_value);

          if (!day.isOffshore) {
            if (rangeSums <= normalHoursOnshore) {
              normalHours = rangeSums;
              normalHoursValue =
                normalHours *
                24 *
                intervention.BillingOrder!.onshore_normal_hour_value;
            } else {
              extraHours = rangeSums - normalHoursOnshore;
              extraHoursValue =
                extraHours *
                24 *
                intervention.BillingOrder!.onshore_extra_hour_value;
              normalHours = normalHoursOnshore;
              normalHoursValue =
                normalHours *
                24 *
                intervention.BillingOrder!.onshore_normal_hour_value;
            }
          } else if (rangeSums <= normalHoursOffshore) {
            normalHours = rangeSums;
            normalHoursValue =
              normalHours *
              24 *
              intervention.BillingOrder!.offshore_normal_hour_value;
          } else {
            extraHours = rangeSums - normalHoursOffshore;
            extraHoursValue =
              extraHours *
              24 *
              intervention.BillingOrder!.offshore_extra_hour_value;
            normalHours = normalHoursOffshore;
            normalHoursValue =
              normalHours *
              24 *
              intervention.BillingOrder!.offshore_normal_hour_value;
          }

          return {
            date: day.day,
            minHour,
            maxHour,
            isOffshore: day.isOffshore,
            rangeSums,
            additionalNightHours,
            additionalNightHoursValue,
            extraHours,
            extraHoursValue,
            normalHours,
            normalHoursValue,
          };
        },
      );

      const totals = calculatedDayHoursArray.reduce(
        (acc, item) => {
          acc.additionalNightHoursValue = parseFloat(
            (
              acc.additionalNightHoursValue +
              (item.additionalNightHoursValue || 0)
            ).toFixed(2),
          );
          acc.extraHoursValue = parseFloat(
            (acc.extraHoursValue + (item.extraHoursValue || 0)).toFixed(2),
          );
          acc.normalHoursValue = parseFloat(
            (acc.normalHoursValue + (item.normalHoursValue || 0)).toFixed(2),
          );
          return acc;
        },
        {
          additionalNightHoursValue: 0,
          extraHoursValue: 0,
          normalHoursValue: 0,
        },
      );

      const totalValue =
        totals.additionalNightHoursValue +
        totals.extraHoursValue +
        totals.normalHoursValue;

      if (intervention.total_value !== null) {
        await updateInterventionUseCase.execute({
          interventionId: interventionId,
          data: {
            total_value: intervention.total_value - totalValue,
          },
        });
      }
    }

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
