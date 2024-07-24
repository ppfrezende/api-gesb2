import fs from 'fs';

import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateInvoiceToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-create-invoice-to-customer-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { InterventionResponseData } from '@/@types/intervention';
import { formatDateToDDMMYYYY } from '@/utils/convertDate';
import PDFDocumentWithTables from 'pdfkit-table';
import { convertDecimalToHour } from '@/utils/convertHour';
import {
  brazilCurrencyFormatter,
  genericCurrencyFormatter,
} from '@/utils/currencyFormat';
import { generateTimesheetResumingTable } from './_generateTimesheetResumingTable';
import { calculateInvoiceToCustomerData } from './_calculateInvoiceToCustomerData';
import { makeConnectTimeSheetToInvoiceToCustomerUseCase } from '@/use-cases/_factories/timesheets_factories/timesheetdata_factories/make-connect-timesheet-to-invoice-to-customer';

export async function createInvoiceToCustomer(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createInvoiceToCustomerBodySchema = z.object({
    isDolarInvoice: z.boolean(),
    invoice_currency_quote: z.number(),
  });

  const createInvoiceToCustomerQuerySchema = z.object({
    interventionId: z.string(),
  });

  const { interventionId } = createInvoiceToCustomerQuerySchema.parse(
    request.params,
  );

  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const { isDolarInvoice, invoice_currency_quote } =
    createInvoiceToCustomerBodySchema.parse(request.body);

  try {
    const interventionInformationXY = {
      x: 50,
      y: 170,
    };
    const tableInformationXY = {
      x: interventionInformationXY.x + 10,
      y: interventionInformationXY.y + 150 + 50,
    };

    const createInvoiceToCustomerUseCase = makeCreateInvoiceToCustomerUseCase();
    const getInterventionUseCase = makeGetInterventionUseCase();

    const { intervention } = await getInterventionUseCase.execute({
      interventionId,
    });

    const {
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
    } = await calculateInvoiceToCustomerData(
      intervention as unknown as InterventionResponseData,
      isDolarInvoice,
      invoice_currency_quote,
    );

    const { invoiceToCustomer } = await createInvoiceToCustomerUseCase.execute({
      isDolarInvoice,
      invoice_currency_quote,
      final_total,
      interventionId,
      technicianId: intervention.technicianId!,
      siteId: intervention.siteId!,
      customerId: intervention.customerId!,
      userName: user.name,
    });

    await connectTimesheetToInvoiceToCustomer(
      intervention as unknown as InterventionResponseData,
      invoiceToCustomer.id,
    );

    const doc = new PDFDocumentWithTables({ size: 'A4' });

    const filePath = 'tmp/invoice.pdf';
    doc.pipe(fs.createWriteStream(filePath));

    reply.header('Content-Type', 'application/pdf');
    reply.header(
      'Content-Disposition',
      'attachment; filename="intervention-summary.pdf"',
    );

    generateHeader(doc, isDolarInvoice);
    doc
      .lineCap('butt')
      .strokeColor('#ff0000', 1)
      .moveTo(50, 105)
      .lineTo(550, 105)
      .stroke();

    generateInterventionInformation(
      doc,
      intervention as unknown as InterventionResponseData,
      interventionInformationXY.x,
      interventionInformationXY.y,
      isDolarInvoice,
      invoice_currency_quote,
    );

    await generateTable(
      doc,
      intervention as unknown as InterventionResponseData,
      tableInformationXY.x,
      tableInformationXY.y,
      isDolarInvoice,
      invoice_currency_quote,
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
      isDolarInvoice,
    );

    doc.end();
    return reply.status(201).send(doc);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
}

function generateHeader(doc: PDFKit.PDFDocument, isDolarInvoice: boolean) {
  doc
    .image('logo.png', 50, 32, { width: 50 })
    .fillColor('#000000')
    .image('iso9001.png', 480, 38, { width: 70 })
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
      `${format(new Date(), `${isDolarInvoice ? 'MM/dd/yyyy' : 'dd/MM/yyyy'}`, {
        locale: isDolarInvoice ? enUS : ptBR,
      })}`,
      0,
      120,
      {
        align: 'right',
      },
    )
    .moveDown();
}

function generateInterventionInformation(
  doc: PDFKit.PDFDocument,
  intervention: InterventionResponseData,
  x: number,
  y: number,
  isDolarInvoice: boolean,
  invoice_currency_quote: number,
) {
  doc
    .fontSize(12)
    .font('Helvetica')
    .text('PROGRESSIVE:', x, y)
    .text(intervention.progressive, x + 145, y)
    .text('OUR REF.:', x, y + 15)
    .text(intervention.intervention_number, x + 145, y + 15)
    .text('DATE:', x, y + 30)
    .font('Helvetica-Oblique')
    .text(
      `${
        intervention.initial_at
          ? formatDateToDDMMYYYY(intervention.initial_at)
          : 'N/A'
      } - ${
        intervention.finished_at
          ? formatDateToDDMMYYYY(intervention.finished_at)
          : 'N/A'
      }`,
      x + 145,
      y + 30,
    )
    .font('Helvetica')
    .text('PLACE:', x, y + 45)
    .text(
      `${intervention.Site.description} - ${
        intervention.Site.isOffshore ? 'OFFSHORE' : 'ONSHORE'
      }`,
      x + 145,
      y + 45,
    )
    .text('CUSTOMER:', x, y + 60)
    .text(intervention.Customer.name, x + 145, y + 60)
    .text('PROJECT MANAGER:', x, y + 75)
    .text(intervention.CustomerProjectManager.name, x + 145, y + 75)
    .text('JOB NUMB. INVOIC.:', x, y + 90)
    .text(intervention.job_number, x + 145, y + 90)
    .text('TECHNICIAN:', x, y + 105)
    .text(
      `${intervention.Technician.name} - ${intervention.Technician.job_title}`,
      x + 145,
      y + 105,
    )
    .text('PURCHASE ORDER:', x, y + 120)
    .text(intervention.po_number, x + 145, y + 120)
    .text('CURRENCY:', x, y + 135)
    .text(`${isDolarInvoice ? 'USD' : 'BRL'}`, x + 145, y + 135)
    .text('CHANGE:', x, y + 150)
    .text(String(invoice_currency_quote), x + 145, y + 150)

    .moveDown();
}

async function generateTable(
  doc: PDFDocumentWithTables,
  intervention: InterventionResponseData,
  x: number,
  y: number,
  isDolarInvoice: boolean,
  invoice_currency_quote: number,
  traveledHours: number,
  workedNormalHours: number,
  totalWorkedNormalHoursValue: number,
  workedExtraHours: number,
  totalWorkedExtraHoursValue: number,
  workedNightHours: number,
  totalWorkedNightHoursValue: number,
  totalTraveledHoursValue: number,
  totalExpenses: number,
  expenseAdminCostValue: number,
) {
  const tableOfValues = {
    headers: [
      { label: 'DESCRIPTION', align: 'center' },
      { label: 'HOURS', align: 'center' },
      { label: `${isDolarInvoice ? '$' : 'R$'}/HOUR`, align: 'center' },
      { label: 'TOTAL', align: 'center' },
    ],
    rows: [
      [
        'ONSHORE TRAVEL',
        `${convertDecimalToHour(traveledHours)}`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                intervention.Skill.travel_hour * 100 * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(intervention.Skill.travel_hour * 100)
        }`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                totalTraveledHoursValue * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(totalTraveledHoursValue)
        }`,
      ],
      [
        `${intervention.isOffshore ? 'OFFSHORE' : 'ONSHORE'}`,
        `${convertDecimalToHour(workedNormalHours)}`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_HN_offshore
                    : intervention.PurchaseOrder.factor_HN_onshore) *
                  100 *
                  invoice_currency_quote,
              )
            : brazilCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_HN_offshore
                    : intervention.PurchaseOrder.factor_HN_onshore) *
                  100,
              )
        }`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                totalWorkedNormalHoursValue * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(totalWorkedNormalHoursValue)
        }`,
      ],
      [
        `${intervention.isOffshore ? 'OFFSHORE EXTRA' : 'ONSHORE EXTRA'}`,
        `${convertDecimalToHour(workedExtraHours)}`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_HE_offshore
                    : intervention.PurchaseOrder.factor_HE_onshore) *
                  100 *
                  invoice_currency_quote,
              )
            : brazilCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_HE_offshore
                    : intervention.PurchaseOrder.factor_HE_onshore) *
                  100,
              )
        }`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                totalWorkedExtraHoursValue * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(totalWorkedExtraHoursValue)
        }`,
      ],
      [
        `${intervention.isOffshore ? 'OFFSHORE NIGHT' : 'ONSHORE NIGHT'}`,
        `${convertDecimalToHour(workedNightHours)}`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_night_offshore
                    : intervention.PurchaseOrder.factor_night_onshore) *
                  100 *
                  invoice_currency_quote,
              )
            : brazilCurrencyFormatter(
                intervention.Skill.normal_hour *
                  (intervention.isOffshore
                    ? intervention.PurchaseOrder.factor_night_offshore
                    : intervention.PurchaseOrder.factor_night_onshore) *
                  100,
              )
        }`,
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                totalWorkedNightHoursValue * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(totalWorkedNightHoursValue)
        }`,
      ],
      [
        'EXPENSES ADMIN. COST',
        '-',
        '-',
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(
                expenseAdminCostValue * invoice_currency_quote,
              )
            : brazilCurrencyFormatter(expenseAdminCostValue)
        }`,
      ],
      [
        'EXPENSES',
        '-',
        '-',
        `${
          isDolarInvoice
            ? genericCurrencyFormatter(totalExpenses * invoice_currency_quote)
            : brazilCurrencyFormatter(totalExpenses)
        }`,
      ],
    ],
  };

  const tableOfValuesOptions = {
    x,
    y,
    padding: [1, 1, 5, 4],
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
    .text('TOTAL', x + 40, y + 130)
    .text(
      `${
        isDolarInvoice
          ? genericCurrencyFormatter(
              (totalExpenses +
                expenseAdminCostValue +
                totalWorkedNormalHoursValue +
                totalWorkedExtraHoursValue +
                totalWorkedNightHoursValue +
                totalTraveledHoursValue) *
                invoice_currency_quote,
            )
          : brazilCurrencyFormatter(
              totalExpenses +
                expenseAdminCostValue +
                totalWorkedNormalHoursValue +
                totalWorkedExtraHoursValue +
                totalWorkedNightHoursValue +
                totalTraveledHoursValue,
            )
      }`,
      0,
      y + 130,
      {
        align: 'right',
      },
    );
}

async function connectTimesheetToInvoiceToCustomer(
  intervention: InterventionResponseData,
  invoiceToCustomerId: string,
) {
  intervention.timesheets.map(async (timesheet) => {
    const connectTimesheetToInvoiceToCustomerUseCase =
      makeConnectTimeSheetToInvoiceToCustomerUseCase();

    const timesheetdataId = timesheet.id;

    await connectTimesheetToInvoiceToCustomerUseCase.execute({
      timesheetdataId,
      invoiceToCustomerId,
    });
  });
}
