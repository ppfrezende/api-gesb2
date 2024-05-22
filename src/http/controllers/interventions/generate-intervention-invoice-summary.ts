import PDFDocument from 'pdfkit';
import fs from 'fs';

import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { formatDateToDDMMYYYY } from '@/utils/convertDate';
import { InterventionResponseData } from '@/@types/intervention';
import { maskEmail } from '@/utils/maskEmail';
import { convertDecimalToHour } from '@/utils/convertHour';
import {
  brazilCurrencyFormatter,
  genericCurrencyFormatter,
} from '@/utils/currencyFormat';

export async function generateInterventionInvoiceSummary(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getInterventionQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = getInterventionQuerySchema.parse(request.params);
  try {
    const getIntervention = makeGetInterventionUseCase();

    const { intervention } = await getIntervention.execute({
      interventionId: interventionId,
    });

    const interventionInformationXY = {
      x: 50,
      y: 170,
    };

    const technicianInfomationXY = {
      x: 60,
      y: interventionInformationXY.y + 80,
    };

    const customerInfomationXY = {
      x: technicianInfomationXY.x + 260,
      y: technicianInfomationXY.y,
    };

    const purchaseOrderInfomationXY = {
      x: technicianInfomationXY.x,
      y: technicianInfomationXY.y + 110,
    };

    const totalInvoiceInfomationXY = {
      x: purchaseOrderInfomationXY.x,
      y: purchaseOrderInfomationXY.y + 230,
    };

    const timesheetInfomationXY = {
      x: technicianInfomationXY.x,
      y: 50,
    };

    const doc = new PDFDocument({ size: 'A4' });
    const filePath = 'tmp/invoice.pdf';
    doc.pipe(fs.createWriteStream(filePath));

    reply.header('Content-Type', 'application/pdf');
    reply.header(
      'Content-Disposition',
      'attachment; filename="intervention-summary.pdf"',
    );

    generateHeader(doc);
    doc
      .lineCap('butt')
      .strokeColor('#000000', 0.2)
      .moveTo(50, 20)
      .lineTo(550, 20)
      .stroke();
    doc
      .lineCap('butt')
      .strokeColor('#000000', 0.2)
      .moveTo(50, 100)
      .lineTo(550, 100)
      .stroke();
    generateInterventionInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      interventionInformationXY.x,
      interventionInformationXY.y,
    );
    generateTechnicianInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      technicianInfomationXY.x,
      technicianInfomationXY.y,
    );
    generateCustomerInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      customerInfomationXY.x,
      customerInfomationXY.y,
    );

    generatePurchaseOrderInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      purchaseOrderInfomationXY.x,
      purchaseOrderInfomationXY.y,
    );

    generateSumaryInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      totalInvoiceInfomationXY.x,
      totalInvoiceInfomationXY.y,
    );
    generateFooter(doc);

    doc.addPage();

    generateTimesheetInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      timesheetInfomationXY.x,
      timesheetInfomationXY.y,
    );

    doc.addPage();

    generateExpensesInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      timesheetInfomationXY.x,
      50,
    );

    generateFooter(doc);

    doc.end();

    return reply.status(200).send(doc);
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}

function generateHeader(doc: PDFKit.PDFDocument) {
  doc
    .image('logo.png', 50, 38, { width: 50 })
    .fillColor('#000000', 0.8)
    .fontSize(18)
    .font('Helvetica-Oblique')
    .text('T&T Sistemi', 110, 55)
    .fontSize(8)
    .font('Helvetica')
    .text('CNPJ: 11.141.338/0001-80', 200, 40, {
      align: 'right',
    })
    .text('Phone:  +55 (21) 2239-0118', 200, 50, {
      align: 'right',
    })
    .text('Av Embaixador Abelardo Bueno, 1 - Sala 416', 200, 60, {
      align: 'right',
    })
    .text('Barra da Tijuca, Rio de Janeiro - RJ CEP: 22775-040', 200, 70, {
      align: 'right',
    })
    .text('Brazil', 200, 80, { align: 'right' })
    .fontSize(20)
    .font('Helvetica-Bold')
    .text('RESUMO DA FATURA', 200, 125)
    .moveDown();
}

function generateInterventionInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  doc
    .fontSize(9)
    .font('Helvetica-Bold')
    .text('Prog. Cons.:', x, y)
    .text(intervention.progressive, x + 100, y)
    .text('Nº da Intervenção:', x, y + 15)
    .text(intervention.intervention_number, x + 100, y + 15)
    .text('Data de Início:', x, y + 30)
    .font('Helvetica-Oblique')
    .text(
      intervention.initial_at
        ? formatDateToDDMMYYYY(intervention.initial_at)
        : 'N/A',
      150,
      y + 30,
    )
    .font('Helvetica-Bold')
    .text('Data fim:', x, y + 45)
    .font('Helvetica-Oblique')
    .text(
      intervention.finished_at
        ? formatDateToDDMMYYYY(intervention.finished_at)
        : 'N/A',
      x + 100,
      y + 45,
    )
    .font('Helvetica-Bold')
    .text('P.O. Number:', x + 300, y)
    .text(intervention.po_number, x + 400, y)
    .text('Job Number:', x + 300, y + 15)
    .text(intervention.job_number, x + 400, y + 15)
    .text('Offshore:', x + 300, y + 30)
    .text(intervention.isOffshore ? 'SIM' : 'NÃO', x + 400, y + 30)

    .moveDown();
}

function generateTechnicianInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  doc
    .roundedRect(x - 15, y, 240, 90, 2)
    .strokeOpacity(0.6)
    .stroke()
    .fontSize(9)
    .font('Helvetica-Bold')
    .text('Informações do Técnico:', x + 50, y + 10)
    .text('Nome:', x, y + 30)
    .font('Helvetica')
    .text(intervention.Technician.name, x + 60, y + 30)
    .font('Helvetica-Bold')
    .text('Cargo:', x, y + 45)
    .font('Helvetica')
    .text(intervention.Technician.job_title, x + 60, y + 45)
    .font('Helvetica-Bold')
    .text('E-mail:', x, y + 60)
    .font('Helvetica')
    .text(maskEmail(intervention.Technician.email), x + 60, y + 60)

    .moveDown();
}

function generateCustomerInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  doc
    .roundedRect(x - 15, y, 240, 90, 2)
    .strokeOpacity(0.6)
    .stroke()
    .fontSize(9)
    .font('Helvetica-Bold')
    .text('Informações do Cliente/Site:', x + 40, y + 10)
    .text('Cliente:', x, y + 30)
    .font('Helvetica')
    .text(intervention.Customer.name, x + 80, y + 30)
    .font('Helvetica-Bold')
    .text('Proj. Manager:', x, y + 45)
    .font('Helvetica')
    .text(intervention.CustomerProjectManager.name, x + 80, y + 45)
    .font('Helvetica-Bold')
    .text('Site:', x, y + 60)
    .font('Helvetica')
    .text(
      `${intervention.Site.description} - ${
        intervention.Site.isOffshore ? 'OffShore' : 'OnShore'
      }`,
      x + 80,
      y + 60,
    )

    .moveDown();
}
function generatePurchaseOrderInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  doc
    .roundedRect(x - 15, y, 500, 225, 2)
    .strokeOpacity(0.6)
    .stroke()
    .fontSize(9)

    .font('Helvetica-Bold')
    .text('Dados da P.O.:', x + 200, y + 10)

    .text('Nome da P.O.:', x, y + 30)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.name, x + 80, y + 30)

    .font('Helvetica-Bold')
    .text('Descrição:', x, y + 45)
    .font('Helvetica')
    .text(
      `${intervention.PurchaseOrder.description.slice(0, 50)}${
        intervention.PurchaseOrder.description.length > 50 ? '...' : ''
      }`,
      x + 80,
      y + 45,
      {
        width: 140,
      },
    )

    .font('Helvetica-Bold')
    .text('Site:', x, y + 75)
    .font('Helvetica')
    .text(
      `${intervention.Site.description} - ${
        intervention.Site.isOffshore ? 'OffShore' : 'OnShore'
      }`,
      x + 80,
      y + 75,
    )

    .font('Helvetica-Bold')
    .text('Time OnShore:', x, y + 90)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.time_onshore, x + 80, y + 90)

    .font('Helvetica-Bold')
    .text('Time OffShore:', x, y + 105)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.time_offshore, x + 80, y + 105)

    .font('Helvetica-Bold')
    .text('Time Travel:', x, y + 120)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.time_travel, x + 80, y + 120)

    .font('Helvetica-Bold')
    .text('Mensal:', x, y + 135)
    .font('Helvetica')
    .text(
      `${intervention.PurchaseOrder.isMonthly ? 'SIM' : 'NÃO'}`,
      x + 80,
      y + 135,
    )

    .font('Helvetica-Bold')
    .text('Adicional:', x, y + 150)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.adictional.toString(), x + 80, y + 150)

    .font('Helvetica-Bold')
    .text('Calendário:', x, y + 165)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.whatsCalendar, x + 80, y + 165)

    .font('Helvetica-Bold')
    .text('Moeda:', x, y + 180)
    .font('Helvetica')
    .text(intervention.PurchaseOrder.currency, x + 80, y + 180)

    .lineCap('butt')
    .moveTo(x + 230, y + 210)
    .lineTo(x + 230, y + 30)
    .strokeOpacity(0.2)
    .stroke()

    .font('Helvetica-Bold')
    .text('H.N. OnShore:', x + 260, y + 30)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_HN_onshore.toString(),
      x + 370,
      y + 30,
    )
    .font('Helvetica-Bold')
    .text('H.N. OffShore:', x + 260, y + 45)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_HN_offshore.toString(),
      x + 370,
      y + 45,
    )
    .font('Helvetica-Bold')
    .text('H. Noite OnShore:', x + 260, y + 60)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_night_onshore.toString(),
      x + 370,
      y + 60,
    )
    .font('Helvetica-Bold')
    .text('H. Noite OffShore:', x + 260, y + 75)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_night_offshore.toString(),
      x + 370,
      y + 75,
    )
    .font('Helvetica-Bold')
    .text('H. Feriado OnShore:', x + 260, y + 90)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_holiday_onshore.toString(),
      x + 370,
      y + 90,
    )
    .font('Helvetica-Bold')
    .text('H. Feriado OffShore:', x + 260, y + 105)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_holiday_offshore.toString(),
      x + 370,
      y + 105,
    )
    .font('Helvetica-Bold')
    .text('H. Over XD:', x + 260, y + 120)
    .font('Helvetica')
    .text(
      intervention.PurchaseOrder.factor_over_xd.toString(),
      x + 370,
      y + 120,
    )
    .font('Helvetica-Bold')
    .text('Skill:', x + 240, y + 145)
    .text('Descrição:', x + 260, y + 160)
    .font('Helvetica')
    .text(
      `${intervention.Skill.skill_description.slice(0, 50)}${
        intervention.Skill.skill_description.length > 50 ? '...' : ''
      }`,
      x + 330,
      y + 160,
      {
        width: 140,
      },
    )

    .font('Helvetica-Bold')
    .text('Hora Normal:', x + 260, y + 190)
    .font('Helvetica')
    .text(intervention.Skill.normal_hour.toString(), x + 330, y + 190)
    .font('Helvetica-Bold')
    .text('Hora Viagem:', x + 260, y + 205)
    .font('Helvetica')
    .text(intervention.Skill.travel_hour.toString(), x + 330, y + 205)

    .moveDown();
}

function generateSumaryInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  let totalHours = 0;
  let totalExpenses = 0;

  intervention.timesheets.map((timesheet) => {
    totalHours +=
      timesheet.normal_hours_range_A + timesheet.normal_hours_range_B;
  });

  intervention.expenses.forEach((expense) => {
    totalExpenses += expense.expense_value * (expense.currency_quote / 10);
  });

  const hourCalculation =
    totalHours *
    24 *
    intervention.Skill.normal_hour *
    intervention.PurchaseOrder.factor_HN_offshore *
    100;

  const totalInvoice = hourCalculation + totalExpenses;

  doc
    .fontSize(9)

    .font('Helvetica-Bold')
    .text('Total de horas:', x, y + 30)
    .font('Helvetica')
    .text(convertDecimalToHour(totalHours), x + 100, y + 30, { align: 'right' })

    .font('Helvetica-Bold')
    .text('Valor total das horas:', x, y + 45)
    .font('Helvetica')
    .text(brazilCurrencyFormatter(hourCalculation), x + 100, y + 45, {
      align: 'right',
    })

    .font('Helvetica-Bold')
    .text('Total Despesas:', x, y + 60)
    .font('Helvetica')
    .text(brazilCurrencyFormatter(totalExpenses), x + 100, y + 60, {
      align: 'right',
    })

    .fontSize(12)
    .font('Helvetica-Bold')
    .text('Total:', x, y + 90)
    .text(brazilCurrencyFormatter(totalInvoice), x + 100, y + 90, {
      align: 'right',
    })

    .moveDown();
}

function generateTimesheetInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  const pageHeight = doc.page.height;
  const maxContentHeight = pageHeight - 50;

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .text('Informações do Timesheet:', x + 180, y - 15);

  intervention.timesheets.map((timesheet, index) => {
    let newY = y + index * 340;
    const spacingHeader = x + 80;
    if (newY + 330 > maxContentHeight) {
      doc.addPage();
      newY = 50;
    }
    doc
      .undash()
      .roundedRect(x - 15, newY, 500, 330, 2)
      .strokeOpacity(0.6)
      .stroke()
      .fontSize(8)
      .font('Helvetica-Bold')
      .text('De:', x, newY + 15)
      .font('Helvetica')
      .text(formatDateToDDMMYYYY(timesheet.first_date), x + 20, newY + 15)
      .font('Helvetica-Bold')
      .text('Até:', x, newY + 30)
      .font('Helvetica')
      .text(formatDateToDDMMYYYY(timesheet.second_date), x + 20, newY + 30);
    doc
      .font('Helvetica-Bold')
      .text('Total Horas Normais:', x + 350, newY + 15)
      .font('Helvetica')
      .text(
        convertDecimalToHour(
          timesheet.normal_hours_range_A + timesheet.normal_hours_range_B,
        ),
        x + 40,
        newY + 15,
        {
          align: 'right',
        },
      )
      .font('Helvetica-Bold')
      .text('Total Horas Extras:', x + 357, newY + 30)
      .font('Helvetica')
      .text(
        convertDecimalToHour(
          timesheet.extra_hours_range_C + timesheet.extra_hours_range_D,
        ),
        x + 40,
        newY + 30,
        {
          align: 'right',
        },
      );

    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('DATA:', x + 8, newY + 65);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('VIAGEM:', spacingHeader, newY + 60);
    doc.font('Courier-Bold').text('PARTIDA/', spacingHeader - 20, newY + 70);
    doc.font('Courier-Bold').text('CHEGADA', spacingHeader + 20, newY + 70);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('RANGE A:', spacingHeader + 75, newY + 60);
    doc.font('Courier-Bold').text('DE / A', spacingHeader + 79, newY + 70);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('RANGE B:', spacingHeader + 159, newY + 60);
    doc.font('Courier-Bold').text('DE / A', spacingHeader + 163, newY + 70);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('RANGE C:', spacingHeader + 243, newY + 60);
    doc.font('Courier-Bold').text('DE / A', spacingHeader + 247, newY + 70);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('RANGE D:', spacingHeader + 327, newY + 60);
    doc.font('Courier-Bold').text('DE / A', spacingHeader + 331, newY + 70);

    timesheet.timesheetdays.map((timesheetday, indexDay) => {
      const newDayY = newY + indexDay * 15;
      doc
        .fontSize(7)
        .font('Courier')
        .text(formatDateToDDMMYYYY(timesheetday.day), x, newDayY + 85);
      doc
        .font('Courier')
        .text(
          `${
            timesheetday.departure <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.departure)
          } | ${
            timesheetday.arrival <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.arrival)
          }`,
          spacingHeader - 20,
          newDayY + 85,
        );
      doc
        .font('Courier')
        .text(
          `${
            timesheetday.rangeAfrom <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeAfrom)
          } | ${
            timesheetday.rangeAto <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeAto)
          }`,
          spacingHeader + 64,
          newDayY + 85,
        );
      doc
        .font('Courier')
        .text(
          `${
            timesheetday.rangeBfrom <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeBfrom)
          } | ${
            timesheetday.rangeBto <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeBto)
          }`,
          spacingHeader + 148,
          newDayY + 85,
        );
      doc
        .font('Courier')
        .text(
          `${
            timesheetday.rangeCfrom <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeCfrom)
          } | ${
            timesheetday.rangeCto <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeCto)
          }`,
          spacingHeader + 232,
          newDayY + 85,
        );
      doc
        .font('Courier')
        .text(
          `${
            timesheetday.rangeDfrom <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeDfrom)
          } | ${
            timesheetday.rangeDto <= 0
              ? '------'
              : convertDecimalToHour(timesheetday.rangeDto)
          }`,
          spacingHeader + 316,
          newDayY + 85,
        );
    });

    doc
      .lineCap('butt')
      .moveTo(x, newY + 48.5)
      .lineTo(x + 470, newY + 48.5)
      .dash(3, { space: 2 })
      .strokeOpacity(0.2)
      .stroke();
  });
  doc.moveDown();
}

function generateExpensesInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
) {
  const maxExpensesPerPage = 46;
  let currentPageExpensesCount = 0;

  const calculateRectHeight = (expensesCount: number) => expensesCount * 15;

  const renderHeader = (x: number, y: number) => {
    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .text('Despesas:', x + 210, y - 15);
    doc
      .fontSize(8)
      .font('Courier-Bold')
      .text('DATA', x, y + 15);
    doc.text('TIPO', x + 60, y + 15);
    doc.text('DESCRIÇÃO', x + 140, y + 15);
    doc.text('MOEDA', x + 240, y + 15);
    doc.text('COTAÇÃO', x + 300, y + 15);
    doc.text('VALOR', x + 360, y + 15);
    doc.text('VALOR(R$)', x + 420, y + 15);
  };

  const renderBordersAndLines = (x: number, y: number, rectHeight: number) => {
    doc
      .lineCap('butt')
      .moveTo(x + 55, y + 10)
      .lineTo(x + 55, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
    doc
      .lineCap('butt')
      .moveTo(x + 135, y + 10)
      .lineTo(x + 135, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
    doc
      .lineCap('butt')
      .moveTo(x + 235, y + 10)
      .lineTo(x + 235, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
    doc
      .lineCap('butt')
      .moveTo(x + 295, y + 10)
      .lineTo(x + 295, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
    doc
      .lineCap('butt')
      .moveTo(x + 355, y + 10)
      .lineTo(x + 355, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
    doc
      .lineCap('butt')
      .moveTo(x + 415, y + 10)
      .lineTo(x + 415, y + rectHeight)
      .strokeOpacity(0.2)
      .stroke();
  };

  renderBordersAndLines(x, y, calculateRectHeight(maxExpensesPerPage));
  renderHeader(x, y);

  let allTotalExpenses = 0;
  let totalExpenses = 0;

  intervention.expenses.forEach((expense) => {
    if (currentPageExpensesCount >= maxExpensesPerPage) {
      doc.addPage();
      currentPageExpensesCount = 0;
      y = 0;
      renderBordersAndLines(x, y, calculateRectHeight(maxExpensesPerPage));
      renderHeader(x, y);
    }

    const newExpenseDateY = y + currentPageExpensesCount * 15 + 30;
    doc
      .fontSize(8)
      .font('Courier')
      .text(formatDateToDDMMYYYY(expense.expense_date), x, newExpenseDateY);
    doc.text(expense.expense_type, x + 60, newExpenseDateY);
    doc.text(
      `${expense.description.slice(0, 15)}${
        expense.description.length > 15 ? '...' : ''
      }`,
      x + 140,
      newExpenseDateY,
    );
    doc.text(expense.currency, x + 240, newExpenseDateY);
    doc.text(
      (expense.currency_quote / 10).toString(),
      x + 300,
      newExpenseDateY,
    );
    doc.text(
      genericCurrencyFormatter(expense.expense_value),
      x + 360,
      newExpenseDateY,
    );
    doc.text(
      brazilCurrencyFormatter(
        expense.expense_value * (expense.currency_quote / 10),
      ),
      x + 420,
      newExpenseDateY,
    );

    totalExpenses += expense.expense_value;

    allTotalExpenses += expense.expense_value * (expense.currency_quote / 10);

    currentPageExpensesCount++;
  });

  doc.text('TOTAL', x, y + calculateRectHeight(maxExpensesPerPage) + 10);
  doc.text(
    genericCurrencyFormatter(totalExpenses),
    x + 355,
    y + calculateRectHeight(maxExpensesPerPage) + 10,
  );
  doc.text(
    brazilCurrencyFormatter(allTotalExpenses),
    x + 410,
    y + calculateRectHeight(maxExpensesPerPage) + 10,
  );

  doc.moveDown();
}

function generateFooter(doc: PDFKit.PDFDocument) {
  doc
    .fontSize(8)
    .font('Helvetica')
    .text('T&T Sistemas Brasil LTDA. - www.tetsistemi.com.br', 50, 755, {
      align: 'center',
      width: 500,
    });
}
