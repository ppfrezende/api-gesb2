import fs from 'fs';

import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import PDFDocumentWithTables from 'pdfkit-table';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { formatDateToDDMMYYYY } from '@/utils/convertDate';
import { convertDecimalToHour } from '@/utils/convertHour';
import {
  brazilCurrencyFormatter,
  euroCurrencyFormatter,
  genericCurrencyFormatter,
} from '@/utils/currencyFormat';
import { generateTimesheetResumingTable } from './_generateTimesheetResuming';
import { InterventionResponseData } from '@/@types/intervention';
import { makeUpdateInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-update-intervention-use-case';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { Decimal as PrismaDecimal } from '@prisma/client/runtime/library';

export async function generateResumeForApproval(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const generateResumeForApprovalQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = generateResumeForApprovalQuerySchema.parse(
    request.params,
  );

  const getUserProfile = makeGetUserProfileUseCase();

  const { user: userLoggedIn } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  try {
    const getInterventionUseCase = makeGetInterventionUseCase();
    const updateInterventionUseCase = makeUpdateInterventionUseCase();

    const { intervention } = await getInterventionUseCase.execute({
      interventionId,
    });

    if (!intervention.isMonthly && intervention.timesheets!.length === 0) {
      throw new ResourceNotFoundError();
    }

    if (
      intervention.isMonthly === false &&
      intervention.BillingOrder !== undefined &&
      intervention.timesheets
    ) {
      const calculatedDayHoursArray = intervention.timesheets.flatMap(
        (timesheet) =>
          timesheet.timesheetdays.map((day) => {
            const hourRanges = [
              day.rangeAfrom,
              day.rangeAto,
              day.rangeBfrom,
              day.rangeBto,
              day.rangeCfrom,
              day.rangeCto,
              day.rangeDfrom,
              day.rangeDto,
            ]
              .filter((value) => value !== null)
              .map((value) =>
                value instanceof PrismaDecimal ? value.toNumber() : value,
              );

            const minHour =
              hourRanges.length > 0
                ? Number(Math.min(...hourRanges).toFixed(3))
                : 0;
            const maxHour =
              hourRanges.length > 0
                ? Number(Math.max(...hourRanges).toFixed(3))
                : 0;

            const rangeSums = Number(
              [
                day.rangeAto && day.rangeAfrom
                  ? day.rangeAto.toNumber() - day.rangeAfrom.toNumber()
                  : 0,
                day.rangeBto && day.rangeBfrom
                  ? day.rangeBto.toNumber() - day.rangeBfrom.toNumber()
                  : 0,
                day.rangeCto && day.rangeCfrom
                  ? day.rangeCto.toNumber() - day.rangeCfrom.toNumber()
                  : 0,
                day.rangeDto && day.rangeDfrom
                  ? day.rangeDto.toNumber() - day.rangeDfrom.toNumber()
                  : 0,
              ]
                .filter((value) => !isNaN(value))
                .reduce((acc, val) => acc + val, 0)
                .toFixed(2),
            );

            const travelRangeSum = Number(
              [
                day.arrival && day.departure
                  ? day.arrival.toNumber() - day.departure.toNumber()
                  : 0,
              ]
                .filter((value) => !isNaN(value))
                .reduce((acc, val) => acc + val, 0)
                .toFixed(3),
            );

            const morningNightHoursLimit = 0.25;
            const eveningNightHoursLimit = 0.916;
            const normalHoursOnshore = 0.333;
            const normalHoursOffshore = 0.5;

            let additionalNightHours = 0;
            let normalHours = 0;
            let extraHours = 0;

            const travelRangeSumValue = Number(
              (intervention.BillingOrder?.travel_hour_value
                ? travelRangeSum *
                  Number(intervention.BillingOrder?.travel_hour_value)
                : 0
              ).toFixed(3),
            );

            if (minHour <= morningNightHoursLimit) {
              additionalNightHours += morningNightHoursLimit - minHour;
            }

            if (maxHour >= eveningNightHoursLimit) {
              additionalNightHours += maxHour - eveningNightHoursLimit;
            }

            if (!day.isOffshore) {
              if (rangeSums <= normalHoursOnshore) {
                normalHours = rangeSums;
              } else {
                extraHours = rangeSums - normalHoursOnshore;

                normalHours = normalHoursOnshore;
              }
            } else if (rangeSums <= normalHoursOffshore) {
              normalHours = rangeSums;
            } else {
              extraHours = rangeSums - normalHoursOffshore;

              normalHours = normalHoursOffshore;
            }

            return {
              date: day.day,
              travelRangeSum,
              travelRangeSumValue,
              minHour,
              maxHour,
              isOffshore: day.isOffshore,
              rangeSums,
              additionalNightHours,
              extraHours,
              normalHours,
            };
          }),
      );

      const onlyTraveledDays = calculatedDayHoursArray
        .filter((day) => {
          return day.rangeSums === 0 && day.travelRangeSum > 0;
        })
        .map((day) => ({
          ...day,
          isOver: false,
        }));

      const workedDays = calculatedDayHoursArray?.filter((day) => {
        return day.rangeSums > 0;
      });

      const calculatedOnlyTraveledHoursValueArray = onlyTraveledDays?.map(
        (day) => {
          const travelRangeSumValue = Number(
            (
              day.travelRangeSum *
              24 *
              Number(intervention.BillingOrder?.travel_hour_value)
            ).toFixed(2),
          );

          return {
            date: day.date,
            travelRangeSumValue,
            travelRangeSum: day.travelRangeSum,
            isOffshore: day.isOffshore,
          };
        },
      );

      const calculatedDayHoursValueArray = workedDays?.map((day, index) => {
        if (
          intervention.BillingOrder?.over_days &&
          index < intervention.BillingOrder?.over_days
        ) {
          const travelRangeSumValue = Number(
            (
              day.travelRangeSum *
              24 *
              Number(intervention.BillingOrder?.travel_hour_value)
            ).toFixed(2),
          );

          const additionalNightHoursValue = Number(
            (
              day.additionalNightHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_night_hour_value)
                : Number(intervention.BillingOrder!.onshore_night_hour_value))
            ).toFixed(2),
          );

          const extraHoursValue = Number(
            (
              day.extraHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_extra_hour_value)
                : Number(intervention.BillingOrder!.onshore_extra_hour_value))
            ).toFixed(2),
          );

          const normalHoursValue = Number(
            (
              day.normalHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_normal_hour_value)
                : Number(intervention.BillingOrder!.onshore_normal_hour_value))
            ).toFixed(2),
          );

          return {
            date: day.date,
            travelRangeSumValue,
            travelRangeSum: day.travelRangeSum,
            isOffshore: day.isOffshore,
            additionalNightHoursValue,
            additionalNightHours: day.additionalNightHours,
            extraHoursValue,
            extraHours: day.extraHours,
            normalHoursValue,
            normalHours: day.normalHours,
            isOver: false,
          };
        } else {
          const travelRangeSumValue = Number(
            (
              day.travelRangeSum *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_over_hour_value)
                : Number(intervention.BillingOrder!.onshore_over_hour_value))
            ).toFixed(2),
          );

          const additionalNightHoursValue = Number(
            (
              day.additionalNightHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_over_hour_value)
                : Number(intervention.BillingOrder!.onshore_over_hour_value))
            ).toFixed(2),
          );
          const extraHoursValue = Number(
            (
              day.extraHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_over_hour_value)
                : Number(intervention.BillingOrder!.onshore_over_hour_value))
            ).toFixed(2),
          );

          const normalHoursValue = Number(
            (
              day.normalHours *
              24 *
              (day.isOffshore === true
                ? Number(intervention.BillingOrder!.offshore_over_hour_value)
                : Number(intervention.BillingOrder!.onshore_over_hour_value))
            ).toFixed(2),
          );

          return {
            date: day.date,
            travelRangeSumValue,
            travelRangeSum: day.travelRangeSum,
            isOffshore: day.isOffshore,
            additionalNightHoursValue,
            additionalNightHours: day.additionalNightHours,
            extraHoursValue,
            extraHours: day.extraHours,
            normalHoursValue,
            normalHours: day.normalHours,
            isOver: true,
          };
        }
      });

      const onlyTraveledHoursTotalValue =
        calculatedOnlyTraveledHoursValueArray?.reduce(
          (acc, item) => {
            acc.travelRangeSumValue = parseFloat(
              (
                acc.travelRangeSumValue + (item.travelRangeSumValue || 0)
              ).toFixed(3),
            );

            return acc;
          },
          {
            travelRangeSumValue: 0,
          },
        );

      const traveledHours = calculatedDayHoursArray?.reduce(
        (acc, item) => {
          acc.travelRangeSum = parseFloat(
            (acc.travelRangeSum + (item.travelRangeSum || 0)).toFixed(3),
          );

          return acc;
        },
        {
          travelRangeSum: 0,
        },
      );

      const roundedTraveledHours = Number(
        traveledHours ? (traveledHours?.travelRangeSum * 24).toFixed(0) : 0,
      );

      const traveledHoursValue = traveledHours
        ? roundedTraveledHours *
          Number(intervention.BillingOrder.travel_hour_value)
        : 0;

      const notOverWorkedDaysArray = calculatedDayHoursValueArray?.filter(
        (day) => {
          return day.isOver === false;
        },
      );

      const notOverWorkedTotalHours = notOverWorkedDaysArray?.reduce(
        (acc, item) => {
          acc.additionalNightHours = parseFloat(
            (
              acc.additionalNightHours + (item.additionalNightHours || 0)
            ).toFixed(3),
          );
          acc.extraHours = parseFloat(
            (acc.extraHours + (item.extraHours || 0)).toFixed(3),
          );
          acc.normalHours = parseFloat(
            (acc.normalHours + (item.normalHours || 0)).toFixed(3),
          );
          return acc;
        },
        {
          additionalNightHours: 0,
          extraHours: 0,
          normalHours: 0,
        },
      );

      const notOverWorkedTotalValues = notOverWorkedDaysArray?.reduce(
        (acc, item) => {
          acc.travelRangeSumValue = parseFloat(
            (acc.travelRangeSumValue + (item.travelRangeSumValue || 0)).toFixed(
              3,
            ),
          );
          acc.additionalNightHoursValue = parseFloat(
            (
              acc.additionalNightHoursValue +
              (item.additionalNightHoursValue || 0)
            ).toFixed(3),
          );
          acc.extraHoursValue = parseFloat(
            (acc.extraHoursValue + (item.extraHoursValue || 0)).toFixed(3),
          );
          acc.normalHoursValue = parseFloat(
            (acc.normalHoursValue + (item.normalHoursValue || 0)).toFixed(3),
          );
          return acc;
        },
        {
          travelRangeSumValue: 0,
          additionalNightHoursValue: 0,
          extraHoursValue: 0,
          normalHoursValue: 0,
        },
      );

      notOverWorkedTotalValues!.travelRangeSumValue +=
        onlyTraveledHoursTotalValue!.travelRangeSumValue;

      const overWorkedDaysArray = calculatedDayHoursValueArray?.filter(
        (day) => {
          return day.isOver;
        },
      );

      const overWorkedTotalHours = overWorkedDaysArray?.reduce(
        (acc, item) => {
          acc.additionalNightHours = parseFloat(
            (
              acc.additionalNightHours + (item.additionalNightHours || 0)
            ).toFixed(3),
          );
          acc.extraHours = parseFloat(
            (acc.extraHours + (item.extraHours || 0)).toFixed(3),
          );
          acc.normalHours = parseFloat(
            (acc.normalHours + (item.normalHours || 0)).toFixed(3),
          );
          return acc;
        },
        {
          additionalNightHours: 0,
          extraHours: 0,
          normalHours: 0,
        },
      );

      const overWorkedTotalHoursSum =
        overWorkedTotalHours!.additionalNightHours +
        overWorkedTotalHours!.extraHours +
        overWorkedTotalHours!.normalHours;

      const overWorkedTotalValues = overWorkedDaysArray?.reduce(
        (acc, item) => {
          acc.travelRangeSumValue = parseFloat(
            (acc.travelRangeSumValue + (item.travelRangeSumValue || 0)).toFixed(
              3,
            ),
          );
          acc.additionalNightHoursValue = parseFloat(
            (
              acc.additionalNightHoursValue +
              (item.additionalNightHoursValue || 0)
            ).toFixed(3),
          );
          acc.extraHoursValue = parseFloat(
            (acc.extraHoursValue + (item.extraHoursValue || 0)).toFixed(3),
          );
          acc.normalHoursValue = parseFloat(
            (acc.normalHoursValue + (item.normalHoursValue || 0)).toFixed(3),
          );
          return acc;
        },
        {
          travelRangeSumValue: 0,
          additionalNightHoursValue: 0,
          extraHoursValue: 0,
          normalHoursValue: 0,
        },
      );

      overWorkedTotalValues!.travelRangeSumValue +=
        onlyTraveledHoursTotalValue!.travelRangeSumValue;

      const expensesTotalValue = intervention.interventionExpenses?.reduce(
        (acc, item) => {
          acc.expense_value = Number(
            (acc.expense_value + (Number(item.expense_value) || 0)).toFixed(2),
          );

          return acc;
        },
        {
          expense_value: 0,
        },
      );

      const expensesFinalTotalValue = Number(
        (
          (expensesTotalValue
            ? expensesTotalValue.expense_value *
              (intervention.BillingOrder.expense_administration_tax / 100)
            : 0) + expensesTotalValue!.expense_value
        ).toFixed(2),
      );

      const total =
        traveledHoursValue +
        (notOverWorkedTotalValues!.normalHoursValue +
          notOverWorkedTotalValues!.extraHoursValue +
          notOverWorkedTotalValues!.additionalNightHoursValue) +
        (overWorkedTotalValues!.normalHoursValue +
          overWorkedTotalValues!.extraHoursValue +
          overWorkedTotalValues!.additionalNightHoursValue) +
        expensesFinalTotalValue;

      await updateInterventionUseCase.execute({
        interventionId: interventionId,
        updatedBy: userLoggedIn.name,
        data: {
          total_value: total,
        },
      });

      //gerar PDF

      reply.header('Content-Type', 'application/pdf');
      reply.header(
        'Content-Disposition',
        'attachment; filename="intervention-summary.pdf"',
      );
      const doc = new PDFDocumentWithTables({ size: 'A4' });
      const filePath = 'tmp/invoice.pdf';
      doc.pipe(fs.createWriteStream(filePath));

      doc
        .image('logo.png', 50, 32, { width: 50 })
        .fillColor('#000000')
        // .image('iso9001.png', 480, 38, { width: 70 })
        .fontSize(8)
        .font('Helvetica')
        .text('CNPJ: 11.141.338/0001-80', 110, 40, {
          align: 'left',
        })
        .text('Phone:  +55 (21) 2239-0118', 110, 50, {
          align: 'left',
        })
        .text(
          'Av Embaixador Abelardo Bueno, 001, Ed. Lagoa 1 - Salas 413 à 416',
          110,
          60,
          {
            align: 'left',
          },
        )
        .text(
          'CEP: 22775-040 Barra Olímpica, Rio de Janeiro - RJ, Brazil',
          110,
          70,
          {
            align: 'left',
          },
        )
        .fontSize(14)
        .fillColor('#ff0000')
        .font('Helvetica-Bold')
        .text('RESUMING FOR INVOICE APPROVAL', 50, 120)
        .fillColor('#000000')
        .text(
          `${format(
            new Date(),
            `${
              intervention.BillingOrder.currency === 'USD'
                ? 'MM/dd/yyyy'
                : 'dd/MM/yyyy'
            }`,
            {
              locale:
                intervention.BillingOrder.currency === 'BRL' ? ptBR : enUS,
            },
          )}`,
          0,
          120,
          {
            align: 'right',
          },
        )
        .moveDown();

      // //Intervention Information

      doc
        .fontSize(12)
        .font('Helvetica')
        .text('PROGRESSIVE:', 50, 170)
        .text(intervention.progressive, 50 + 145, 170)
        .text('OUR REF.:', 50, 170 + 15)
        .text(intervention.intervention_number, 50 + 145, 170 + 15)
        .text('DATE:', 50, 170 + 30)
        .font('Helvetica-Oblique')
        .text(
          `${
            intervention.initial_at
              ? new Date(intervention.initial_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })
              : 'N/A'
          } - ${
            intervention.finished_at
              ? new Date(intervention.finished_at).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                })
              : 'N/A'
          }`,
          50 + 145,
          170 + 30,
        )
        .font('Helvetica')
        .text('PLACE:', 50, 170 + 45)
        .text(
          `${intervention.Site!.name} - ${
            intervention.Site!.isOffshore ? 'OFFSHORE' : 'ONSHORE'
          }`,
          50 + 145,
          170 + 45,
        )
        .text('CUSTOMER:', 50, 170 + 60)
        .text(intervention.Customer!.company_name, 50 + 145, 170 + 60)
        .text('PROJECT MANAGER:', 50, 170 + 75)
        .text(intervention.CustomerProjectManager!.name, 50 + 145, 170 + 75)
        .text('JOB NUMB.:', 50, 170 + 90)
        .text(intervention.job_number, 50 + 145, 170 + 90)
        .text('TECHNICIAN:', 50, 170 + 105)
        .text(
          `${intervention.Technician!.name} - ${
            intervention.Technician!.job_title
          }`,
          50 + 145,
          170 + 105,
        )
        .text('PURCHASE ORDER:', 50, 170 + 120)
        .text(intervention.customer_po_number, 50 + 145, 170 + 120)
        .text('CURRENCY:', 50, 170 + 135)
        .text(intervention.BillingOrder.currency, 50 + 145, 170 + 135)
        .moveDown();

      //Table Informations

      const tableOfValues = {
        headers: [
          { label: 'DESCRIPTION', align: 'center' },
          { label: 'HOURS', align: 'center' },
          {
            label: `${
              intervention.BillingOrder.currency === 'BRL'
                ? 'R$/HOUR'
                : intervention.BillingOrder.currency === 'EUR'
                ? '£/HOUR'
                : '$/HOUR'
            }`,
            align: 'center',
          },
          {
            label: `${
              intervention.BillingOrder.currency === 'BRL'
                ? 'TOTAL R$'
                : intervention.BillingOrder.currency === 'EUR'
                ? 'TOTAL £'
                : 'TOTAL $'
            }`,
            align: 'center',
          },
        ],
        rows: [
          [
            'TRAVEL',
            `${convertDecimalToHour(
              traveledHours ? traveledHours.travelRangeSum : 0,
            )}`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
                : genericCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
            }`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
                : genericCurrencyFormatter(
                    Number(intervention.BillingOrder.travel_hour_value),
                  )
            }`,
          ],
          [
            'NORMAL HOURS',
            `${convertDecimalToHour(
              notOverWorkedTotalHours ? notOverWorkedTotalHours.normalHours : 0,
            )}`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_normal_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_normal_hour_value,
                        ),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_normal_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_normal_hour_value,
                        ),
                  )
                : genericCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_normal_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_normal_hour_value,
                        ),
                  )
            }`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.normalHoursValue
                      : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.normalHoursValue
                      : 0,
                  )
                : genericCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.normalHoursValue
                      : 0,
                  )
            }`,
          ],
          [
            'EXTRA HOURS',
            `${convertDecimalToHour(
              notOverWorkedTotalHours ? notOverWorkedTotalHours.extraHours : 0,
            )}`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_extra_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_extra_hour_value,
                        ),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_extra_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_extra_hour_value,
                        ),
                  )
                : genericCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_extra_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_extra_hour_value,
                        ),
                  )
            }`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.extraHoursValue
                      : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.extraHoursValue
                      : 0,
                  )
                : genericCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.extraHoursValue
                      : 0,
                  )
            }`,
          ],

          [
            'NIGHT HOURS',
            `${convertDecimalToHour(
              notOverWorkedTotalHours
                ? notOverWorkedTotalHours.additionalNightHours
                : 0,
            )}`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_night_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_night_hour_value,
                        ),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_night_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_night_hour_value,
                        ),
                  )
                : genericCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_night_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_night_hour_value,
                        ),
                  )
            }`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.additionalNightHoursValue
                      : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.additionalNightHoursValue
                      : 0,
                  )
                : genericCurrencyFormatter(
                    notOverWorkedTotalValues
                      ? notOverWorkedTotalValues.additionalNightHoursValue
                      : 0,
                  )
            }`,
          ],

          [
            'OVER HOURS',
            `${convertDecimalToHour(
              overWorkedTotalHoursSum ? overWorkedTotalHoursSum : 0,
            )}`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_over_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_over_hour_value,
                        ),
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_over_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_over_hour_value,
                        ),
                  )
                : genericCurrencyFormatter(
                    intervention.BillingOrder?.isOffshore
                      ? Number(
                          intervention.BillingOrder.offshore_over_hour_value,
                        )
                      : Number(
                          intervention.BillingOrder.onshore_over_hour_value,
                        ),
                  )
            }`,
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    overWorkedTotalValues
                      ? overWorkedTotalValues.additionalNightHoursValue +
                          overWorkedTotalValues.extraHoursValue +
                          overWorkedTotalValues.normalHoursValue
                      : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    overWorkedTotalValues
                      ? overWorkedTotalValues.additionalNightHoursValue +
                          overWorkedTotalValues.extraHoursValue +
                          overWorkedTotalValues.normalHoursValue
                      : 0,
                  )
                : genericCurrencyFormatter(
                    overWorkedTotalValues
                      ? overWorkedTotalValues.additionalNightHoursValue +
                          overWorkedTotalValues.extraHoursValue +
                          overWorkedTotalValues.normalHoursValue
                      : 0,
                  )
            }`,
          ],

          [
            'EXPENSES ADMIN. COST',
            '-',
            '-',
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    expensesTotalValue
                      ? expensesTotalValue.expense_value *
                          (intervention.BillingOrder
                            .expense_administration_tax /
                            100)
                      : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    expensesTotalValue
                      ? expensesTotalValue.expense_value *
                          (intervention.BillingOrder
                            .expense_administration_tax /
                            100)
                      : 0,
                  )
                : genericCurrencyFormatter(
                    expensesTotalValue
                      ? expensesTotalValue.expense_value *
                          (intervention.BillingOrder
                            .expense_administration_tax /
                            100)
                      : 0,
                  )
            }`,
          ],
          [
            'EXPENSES',
            '-',
            '-',
            `${
              intervention.BillingOrder.currency === 'BRL'
                ? brazilCurrencyFormatter(
                    expensesTotalValue ? expensesTotalValue.expense_value : 0,
                  )
                : intervention.BillingOrder.currency === 'EUR'
                ? euroCurrencyFormatter(
                    expensesTotalValue ? expensesTotalValue.expense_value : 0,
                  )
                : genericCurrencyFormatter(
                    expensesTotalValue ? expensesTotalValue.expense_value : 0,
                  )
            }`,
          ],
        ],
      };

      const tableOfValuesOptions = {
        x: 60,
        y: 170 + 150 + 50,
        padding: [1, 1, 5],
        columnsSize: [120, 120, 120, 120],
        divider: {
          header: {
            width: 1,
          },
        },
      };

      doc.table(tableOfValues, tableOfValuesOptions);
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('TOTAL', 60, 170 + 150 + 50 + 130)
        .text(
          `${
            intervention.BillingOrder.currency === 'BRL'
              ? brazilCurrencyFormatter(total)
              : intervention.BillingOrder.currency === 'EUR'
              ? euroCurrencyFormatter(total)
              : genericCurrencyFormatter(total)
          }`,
          20,
          170 + 150 + 50 + 130,
          {
            align: 'right',
          },
        );

      doc
        .fontSize(12)
        .font('Helvetica')
        .text('CHECKED BY:   ___________________', 50, 580);
      doc.text('DATE:   ___________________', 50, 580, {
        align: 'right',
      });
      doc.fontSize(12).font('Helvetica').text('COMMENTS:', 50, 630);
      doc.text('____________________________', 50, 645);
      doc.text('____________________________', 50, 665);
      doc.text('____________________________', 50, 685);
      doc.lineJoin('round').rect(350, 625, 20, 20).stroke();
      doc.text('APPROVED FOR INVOICE', 50, 630, {
        align: 'right',
      });
      doc.text('_____________________________', 50, 685, {
        align: 'right',
      });
      doc.text('PROJECT MANAGER SIGNATURE', 50, 700, {
        align: 'right',
      });

      generateTimesheetResumingTable(
        doc,
        intervention as unknown as InterventionResponseData,
        onlyTraveledDays,
        calculatedDayHoursValueArray,
      );

      doc.end();
      return reply.status(200).send(doc);
    } else if (intervention.isMonthly) {
      const expensesTotalValue = intervention.interventionExpenses?.reduce(
        (acc, item) => {
          acc.expense_value = Number(
            (acc.expense_value + (Number(item.expense_value) || 0)).toFixed(2),
          );

          return acc;
        },
        {
          expense_value: 0,
        },
      );

      await updateInterventionUseCase.execute({
        interventionId: interventionId,
        updatedBy: userLoggedIn.name,
        data: {
          total_value: intervention.total_value
            ? Number(intervention.total_value) +
              (expensesTotalValue?.expense_value
                ? expensesTotalValue?.expense_value
                : 0)
            : 0,
        },
      });
      reply.header('Content-Type', 'application/pdf');
      reply.header(
        'Content-Disposition',
        'attachment; filename="intervention-summary.pdf"',
      );
      const doc = new PDFDocumentWithTables({ size: 'A4' });
      const filePath = 'tmp/invoice.pdf';
      doc.pipe(fs.createWriteStream(filePath));
      doc
        .image('logo.png', 50, 32, { width: 50 })
        .fillColor('#000000')
        // .image('iso9001.png', 480, 38, { width: 70 })
        .fontSize(8)
        .font('Helvetica')
        .text('CNPJ: 11.141.338/0001-80', 110, 40, {
          align: 'left',
        })
        .text('Phone:  +55 (21) 2239-0118', 110, 50, {
          align: 'left',
        })
        .text(
          'Av Embaixador Abelardo Bueno, 001, Ed. Lagoa 1 - Salas 413 à 416',
          110,
          60,
          {
            align: 'left',
          },
        )
        .text(
          'CEP: 22775-040 Barra Olímpica, Rio de Janeiro - RJ, Brazil',
          110,
          70,
          {
            align: 'left',
          },
        )
        .fontSize(14)
        .fillColor('#ff0000')
        .font('Helvetica-Bold')
        .text('RESUMING FOR INVOICE APPROVAL', 50, 120)
        .fillColor('#000000')
        .text(
          `${format(new Date(), 'dd/MM/yyyy', {
            locale: ptBR,
          })}`,
          0,
          120,
          {
            align: 'right',
          },
        )
        .moveDown();
      // //Intervention Information
      doc
        .fontSize(12)
        .font('Helvetica')
        .text('PROGRESSIVE:', 50, 170)
        .text(intervention.progressive, 50 + 145, 170)
        .text('OUR REF.:', 50, 170 + 15)
        .text(intervention.intervention_number, 50 + 145, 170 + 15)
        .text('DATE:', 50, 170 + 30)
        .font('Helvetica-Oblique')
        .text(
          `${
            intervention.initial_at
              ? formatDateToDDMMYYYY(intervention.initial_at.toDateString())
              : 'N/A'
          } - ${
            intervention.finished_at
              ? formatDateToDDMMYYYY(intervention.finished_at.toDateString())
              : 'N/A'
          }`,
          50 + 145,
          170 + 30,
        )
        .font('Helvetica')
        .text('PLACE:', 50, 170 + 45)
        .text(
          `${intervention.Site!.name} - ${
            intervention.Site!.isOffshore ? 'OFFSHORE' : 'ONSHORE'
          }`,
          50 + 145,
          170 + 45,
        )
        .text('CUSTOMER:', 50, 170 + 60)
        .text(intervention.Customer!.company_name, 50 + 145, 170 + 60)
        .text('PROJECT MANAGER:', 50, 170 + 75)
        .text(intervention.CustomerProjectManager!.name, 50 + 145, 170 + 75)
        .text('JOB NUMB.:', 50, 170 + 90)
        .text(intervention.job_number, 50 + 145, 170 + 90)
        .text('TECHNICIAN:', 50, 170 + 105)
        .text(
          `${intervention.Technician!.name} - ${
            intervention.Technician!.job_title
          }`,
          50 + 145,
          170 + 105,
        )
        .text('PURCHASE ORDER:', 50, 170 + 120)
        .text(intervention.customer_po_number, 50 + 145, 170 + 120)
        .text('CURRENCY:', 50, 170 + 135)
        .text('BRL', 50 + 145, 170 + 135)
        .moveDown();
      //Table Informations
      const tableOfValues = {
        headers: [
          { label: 'DESCRIPTION', align: 'center' },
          { label: 'MONTH', align: 'center' },
          {
            label: 'TOTAL R$',
            align: 'center',
          },
        ],
        rows: [
          [
            `${intervention.Site?.isOffshore ? 'OFFSHORE' : 'ONSHORE'}`,
            `1`,
            `${brazilCurrencyFormatter(
              intervention.total_value ? Number(intervention.total_value) : 0,
            )}`,
          ],
          [
            'EXPENSES',
            '-',
            `${brazilCurrencyFormatter(
              expensesTotalValue ? expensesTotalValue.expense_value : 0,
            )}`,
          ],
        ],
      };
      const tableOfValuesOptions = {
        x: 60 + 40,
        y: 170 + 150 + 50,
        padding: [1, 1, 5],
        columnsSize: [120, 120, 120],
        divider: {
          header: {
            width: 1,
          },
        },
      };
      doc.table(tableOfValues, tableOfValuesOptions);
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .text('TOTAL', 60, 170 + 150 + 50 + 130)
        .text(
          brazilCurrencyFormatter(
            intervention.total_value
              ? Number(intervention.total_value) +
                  (expensesTotalValue?.expense_value
                    ? expensesTotalValue?.expense_value
                    : 0)
              : 0,
          ),
          20,
          170 + 150 + 50 + 130,
          {
            align: 'right',
          },
        );
      doc
        .fontSize(12)
        .font('Helvetica')
        .text('CHECKED BY:   ___________________', 50, 580);
      doc.text('DATE:   ___________________', 50, 580, {
        align: 'right',
      });
      doc.fontSize(12).font('Helvetica').text('COMMENTS:', 50, 630);
      doc.text('____________________________', 50, 645);
      doc.text('____________________________', 50, 665);
      doc.text('____________________________', 50, 685);
      doc.lineJoin('round').rect(350, 625, 20, 20).stroke();
      doc.text('APPROVED FOR INVOICE', 50, 630, {
        align: 'right',
      });
      doc.text('_____________________________', 50, 685, {
        align: 'right',
      });
      doc.text('PROJECT MANAGER SIGNATURE', 50, 700, {
        align: 'right',
      });
      // generateTimesheetResumingTable(
      //   doc,
      //   intervention as unknown as InterventionResponseData,
      // );
      doc.end();
      return reply.status(200).send(doc);
    }
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}
