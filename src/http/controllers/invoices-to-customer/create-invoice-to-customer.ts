import { ResourceAlreadyExists } from '@/use-cases/errors/resource-already-exists';
import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { makeGetUserProfileUseCase } from '@/use-cases/_factories/user_factories/make-get-user-profile';
import { makeCreateInvoiceToCustomerUseCase } from '@/use-cases/_factories/invoices-to-customer_factories/make-create-invoice-to-customer-use-case';
import { makeGetInterventionUseCase } from '@/use-cases/_factories/interventions_factories/make-get-intervention-use-case';
import { InterventionResponseData } from '@/@types/intervention';
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
    const createInvoiceToCustomerUseCase = makeCreateInvoiceToCustomerUseCase();
    const getInterventionUseCase = makeGetInterventionUseCase();

    const { intervention } = await getInterventionUseCase.execute({
      interventionId,
    });

    const { total_value, total_value_in_dollar } =
      await calculateInvoiceToCustomerData(
        intervention as unknown as InterventionResponseData,
        isDolarInvoice,
        invoice_currency_quote,
      );

    const { invoiceToCustomer } = await createInvoiceToCustomerUseCase.execute({
      isDolarInvoice,
      invoice_currency_quote,
      total_value,
      total_value_in_dollar,
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
    return reply.status(201).send(invoiceToCustomer);
  } catch (err) {
    if (err instanceof ResourceAlreadyExists) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }
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
