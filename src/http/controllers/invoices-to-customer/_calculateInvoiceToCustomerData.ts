import { InterventionResponseData } from '@/@types/intervention';

export async function calculateInvoiceToCustomerData(
  intervention: InterventionResponseData,
  isDolarInvoice: boolean,
  invoice_currency_quote: number,
) {
  const calculatedDayHoursArray = intervention.timesheets.map((timesheet) =>
    timesheet.timesheetdays.map((day) => {
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
        day.rangeAto - day.rangeAfrom,
        day.rangeBto - day.rangeBfrom,
        day.rangeCto - day.rangeCfrom,
        day.rangeDto - day.rangeDfrom,
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
          ? intervention.Skill.normal_hour *
            intervention.PurchaseOrder.factor_night_offshore
          : intervention.Skill.normal_hour *
            intervention.PurchaseOrder.factor_night_onshore);

      if (!day.isOffshore) {
        if (rangeSums <= normalHoursOnshore) {
          normalHours = rangeSums;
          normalHoursValue =
            normalHours *
            24 *
            intervention.Skill.normal_hour *
            intervention.PurchaseOrder.factor_HN_onshore;
        } else {
          extraHours = rangeSums - normalHoursOnshore;
          extraHoursValue =
            extraHours *
            24 *
            intervention.Skill.normal_hour *
            intervention.PurchaseOrder.factor_HE_onshore;
          normalHours = normalHoursOnshore;
          normalHoursValue =
            normalHours *
            24 *
            intervention.Skill.normal_hour *
            intervention.PurchaseOrder.factor_HN_onshore;
        }
      } else if (rangeSums <= normalHoursOffshore) {
        normalHours = rangeSums;
        normalHoursValue =
          normalHours *
          24 *
          intervention.Skill.normal_hour *
          intervention.PurchaseOrder.factor_HN_offshore;
      } else {
        extraHours = rangeSums - normalHoursOffshore;
        extraHoursValue =
          extraHours *
          24 *
          intervention.Skill.normal_hour *
          intervention.PurchaseOrder.factor_HE_offshore;
        normalHours = normalHoursOffshore;
        normalHoursValue =
          normalHours *
          24 *
          intervention.Skill.normal_hour *
          intervention.PurchaseOrder.factor_HN_offshore;
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
    }),
  );

  const calculatedTravelHoursArray = intervention.timesheets.map((timesheet) =>
    timesheet.timesheetdays
      .filter((day) => day.departure !== null && day.arrival !== null)
      .map((day) => {
        const minHour = Math.min(day.departure, day.arrival);
        const maxHour = Math.max(day.departure, day.arrival);

        const rangeSums = [day.arrival - day.departure]
          .filter((value) => !isNaN(value))
          .reduce((acc, val) => acc + val, 0);

        return {
          date: day.day,
          minHour,
          maxHour,
          rangeSums,
        };
      }),
  );

  const traveledHours = calculatedTravelHoursArray
    .flatMap((timesheet) => timesheet.map((day) => day.rangeSums))
    .reduce((acc, val) => acc + val, 0);

  const workedNormalHours = calculatedDayHoursArray
    .flatMap((timesheet) => timesheet.map((day) => day.normalHours))
    .reduce((acc, val) => acc + val, 0);

  const totalWorkedNormalHoursValue =
    calculatedDayHoursArray
      .flatMap((timesheet) => timesheet.map((day) => day.normalHoursValue))
      .reduce((acc, val) => acc + val, 0) * 100;

  const workedExtraHours = calculatedDayHoursArray
    .flatMap((timesheet) => timesheet.map((day) => day.extraHours))
    .reduce((acc, val) => acc + val, 0);

  const totalWorkedExtraHoursValue =
    calculatedDayHoursArray
      .flatMap((timesheet) => timesheet.map((day) => day.extraHoursValue))
      .reduce((acc, val) => acc + val, 0) * 100;

  const workedNightHours = calculatedDayHoursArray
    .flatMap((timesheet) => timesheet.map((day) => day.additionalNightHours))
    .reduce((acc, val) => acc + val, 0);

  const totalWorkedNightHoursValue =
    calculatedDayHoursArray
      .flatMap((timesheet) =>
        timesheet.map((day) => day.additionalNightHoursValue),
      )
      .reduce((acc, val) => acc + val, 0) * 100;

  const totalTraveledHoursValue =
    intervention.Skill.travel_hour * traveledHours * 24 * 100;

  const totalExpenses = intervention.expenses.reduce(
    (acc, expense) => acc + expense.total_converted,
    0,
  );

  const expenseAdminCostValue =
    (intervention.PurchaseOrder.expense_administration_tax / 100) *
    totalExpenses;

  const sumTotal =
    totalExpenses +
    expenseAdminCostValue +
    totalWorkedNormalHoursValue +
    totalWorkedExtraHoursValue +
    totalWorkedNightHoursValue +
    totalTraveledHoursValue;

  const total = isDolarInvoice ? sumTotal * invoice_currency_quote : sumTotal;
  const final_total = Math.floor(total);

  return {
    traveledHours,
    workedNormalHours,
    totalWorkedNormalHoursValue,
    workedExtraHours,
    totalWorkedExtraHoursValue,
    workedNightHours,
    totalWorkedNightHoursValue,
    totalTraveledHoursValue,
    totalExpenses,
    expenseAdminCostValue,
    final_total,
  };
}
