import { InterventionResponseData } from '@/@types/intervention';
import { formatWeekday } from '@/utils/convertDate';
import { convertDecimalToHour } from '@/utils/convertHour';
import PDFDocumentWithTables from 'pdfkit-table';

export function generateTimesheetResumingTable(
  doc: PDFDocumentWithTables,
  intervention: InterventionResponseData,
) {
  if (intervention.timesheets) {
    const calculatedDayHoursArray = intervention.timesheets.flatMap(
      (timesheet) =>
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
          const rangeTravelSums = [day.arrival - day.departure]
            .filter((value) => !isNaN(value))
            .reduce((acc, val) => acc + val, 0);
          const morningNightHoursLimit = 0.25;
          const eveningNightHoursLimit = 0.9166666666666666;
          const normalHoursOnshore = 0.333333333333333;
          const normalHoursOffshore = 0.5;
          let additionalNightHours = 0;
          let normalHours = 0;
          let extraHours = 0;
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
          const dates = formatWeekday(
            day.day,
            intervention.currency === 'USD' ? 'USD' : 'BRL',
          );
          return [
            dates.dateFormatted || '',
            dates.weekday || '',
            convertDecimalToHour(rangeTravelSums) || '',
            convertDecimalToHour(normalHours) || '',
            convertDecimalToHour(extraHours) || '',
            convertDecimalToHour(additionalNightHours) || '',
          ];
        }),
    );

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
      ],
      rows: calculatedDayHoursArray,
    };
    const timesheetResumingTableOptions = {
      x: 50,
      y: 160,
      padding: [1, 1, 5, 4],
      columnsSize: [80, 80, 80, 80, 80, 80],
      divider: {
        header: {
          width: 1,
        },
      },
    };
    doc.table(timesheetResumingTable, timesheetResumingTableOptions);
  }
}
