import { z } from 'zod';

export const createTimeSheetDataBodySchema = z.object({
  basicInformation: z.object({
    interventionNumber: z.string(),
    firstDate: z.number(),
    secondDate: z.number(),
    isInternational: z.boolean(),
  }),
  dayHoursDataArray: z.object({
    day: z.array(
      z.object({
        __EMPTY_1: z.string(),
      }),
    ),
    departure: z.array(
      z.object({
        __EMPTY_3: z.string(),
      }),
    ),
    arrival: z.array(
      z.object({
        __EMPTY_5: z.string(),
      }),
    ),
    rangeAfrom: z.array(
      z.object({
        __EMPTY_7: z.string(),
      }),
    ),
    rangeAto: z.array(
      z.object({
        __EMPTY_8: z.string(),
      }),
    ),
    rangeBfrom: z.array(
      z.object({
        __EMPTY_10: z.string(),
      }),
    ),
    rangeBto: z.array(
      z.object({
        __EMPTY_12: z.string(),
      }),
    ),
    rangeCfrom: z.array(
      z.object({
        __EMPTY_13: z.string(),
      }),
    ),
    rangeCto: z.array(
      z.object({
        __EMPTY_14: z.string(),
      }),
    ),
    rangeDfrom: z.array(
      z.object({
        __EMPTY_15: z.string(),
      }),
    ),
    rangeDto: z.array(
      z.object({
        __EMPTY_17: z.string(),
      }),
    ),
    on_offshore: z.array(
      z.object({
        __EMPTY_25: z.string(),
      }),
    ),
  }),
});
