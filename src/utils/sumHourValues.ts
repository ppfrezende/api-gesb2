type TimeSheetDay = {
  departure: number | null;
  arrival: number | null;
  rangeAfrom: number | null;
  rangeAto: number | null;
  rangeBfrom: number | null;
  rangeBto: number | null;
  rangeCfrom: number | null;
  rangeCto: number | null;
  rangeDfrom: number | null;
  rangeDto: number | null;
};

export function sumHourValues(timeSheetDayArray: TimeSheetDay[]) {
  let sumA = 0;
  let sumB = 0;
  let sumC = 0;
  let sumD = 0;
  let sumDepartureArrival = 0;

  timeSheetDayArray.forEach((item) => {
    sumDepartureArrival += (item?.arrival || 0) - (item?.departure || 0);
    sumA += (item?.rangeAto || 0) - (item?.rangeAfrom || 0);
    sumB += (item?.rangeBto || 0) - (item?.rangeBfrom || 0);
    sumC += (item?.rangeCto || 0) - (item?.rangeCfrom || 0);
    sumD += (item?.rangeDto || 0) - (item?.rangeDfrom || 0);
  });

  return {
    sumDepartureArrival: sumDepartureArrival,
    sumA: sumA,
    sumB: sumB,
    sumC: sumC,
    sumD: sumD,
  };
}
