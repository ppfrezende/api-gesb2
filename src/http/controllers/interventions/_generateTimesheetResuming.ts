import { InterventionResponseData } from '@/@types/intervention';
import { formatWeekday } from '@/utils/convertDate';
import { convertDecimalToHour } from '@/utils/convertHour';
import PDFDocumentWithTables from 'pdfkit-table';

export type DayData = {
  date?: Date;
  travelRangeSum: number;
  normalHours: number;
  additionalNightHours: number;
  extraHours: number;
  isOver: boolean;
};

export function generateTimesheetResumingTable(
  doc: PDFDocumentWithTables,
  intervention: InterventionResponseData,
  onlyTraveledDays: Partial<DayData>[],
  calculatedDayHoursValueArray: Partial<DayData>[],
) {
  if (intervention.timesheets) {
    const concatenateDataToShow = (
      onlyTraveledDays: Partial<DayData>[],
      calculatedDayHoursValueArray: Partial<DayData>[],
    ): DayData[] => {
      return [
        ...onlyTraveledDays.map((day) => ({
          date: day.date,
          travelRangeSum: day.travelRangeSum ?? 0,
          normalHours: day.normalHours ?? 0,
          additionalNightHours: day.additionalNightHours ?? 0,
          extraHours: day.extraHours ?? 0,
          isOver: day.isOver ?? false,
        })),
        ...calculatedDayHoursValueArray.map((day) => ({
          date: day.date,
          travelRangeSum: day.travelRangeSum ?? 0,
          normalHours: day.normalHours ?? 0,
          additionalNightHours: day.additionalNightHours ?? 0,
          extraHours: day.extraHours ?? 0,
          isOver: day.isOver ?? false,
        })),
      ];
    };

    const toShowDaysDataArray = concatenateDataToShow(
      onlyTraveledDays,
      calculatedDayHoursValueArray,
    ).map((day) => {
      const dates = formatWeekday(
        day.date!,
        intervention.BillingOrder.currency === 'USD' ? 'USD' : 'BRL',
      );

      return [
        dates.dateFormatted || '',
        dates.weekday || '',
        day.travelRangeSum > 0 ? convertDecimalToHour(day.travelRangeSum) : '',
        day.isOver === false && day.normalHours > 0
          ? convertDecimalToHour(day.normalHours)
          : '',
        day.isOver === false && day.extraHours > 0
          ? convertDecimalToHour(day.extraHours)
          : '',
        day.isOver === false &&
        day.additionalNightHours > 0 &&
        day.travelRangeSum === 0
          ? convertDecimalToHour(day.additionalNightHours)
          : '',
        day.isOver === false
          ? ''
          : convertDecimalToHour(
              day.additionalNightHours + day.extraHours + day.normalHours,
            ),
      ];
    });

    doc.addPage();
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
      .fontSize(10)
      .fillColor('#000000')
      .font('Helvetica-Bold')
      .text(`TECHNICIAN:`, 50, 120)
      .font('Helvetica')
      .text(`${intervention.Technician.name}`, 125, 114)
      .text(`${intervention.Technician.job_title}`, 125, 124)
      .moveDown();
    const timesheetResumingTable = {
      headers: [
        { label: 'DAY', align: 'center' },
        { label: 'WEEKDAY', align: 'center' },
        { label: 'TRAVEL', align: 'center' },
        {
          label: `${intervention.Site.isOffshore ? 'OFFSHORE' : 'ONSHORE'}`,
          align: 'center',
        },
        { label: 'EXTRA', align: 'center' },
        { label: 'NIGHT', align: 'center' },
        { label: 'OVER', align: 'center' },
      ],
      rows: toShowDaysDataArray,
    };
    const timesheetResumingTableOptions = {
      x: 50,
      y: 160,
      padding: [1, 1, 5, 4],
      columnsSize: [80, 80, 65, 65, 65, 65, 65],
      divider: {
        header: {
          width: 1,
        },
      },
    };
    doc.table(timesheetResumingTable, timesheetResumingTableOptions);
  }
}
