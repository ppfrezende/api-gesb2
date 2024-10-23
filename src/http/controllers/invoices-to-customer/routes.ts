import { verifyJWT } from '../../middlewares/verify-jwt';
import { verifyUserRole } from '../../middlewares/verify-user-role';
import { FastifyInstance } from 'fastify';
import { createInvoiceToCustomer } from './create-invoice-to-customer';
import { deleteInvoiceToCustomer } from './delete-invoice-to-customer';
import { getInvoiceToCustomersList } from './get-invoices-to-customer';
import { updateIsApprovedInvoiceToCustomer } from './update-is-approved-invoice-to-customer';
import { getInvoiceToCustomer } from './get-invoice-to-customer';
import { getApprovedInvoiceToCustomersList } from './get-approved-invoices-to-customer';
import { getNotApprovedInvoiceToCustomersList } from './get-not-approved-invoices-to-customer';
import { generateInvoiceToCustomerPDF } from './generate-invoice-to-customer-pdf';

export async function invoicesToCustomerRoutes(app: FastifyInstance) {
  app.post(
    '/invoices-to-customer/:interventionId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },  
    createInvoiceToCustomer,
  );

  app.get(
    '/invoices-to-customer/:interventionId/:invoiceToCustomerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    generateInvoiceToCustomerPDF,
  );

  app.get(
    '/invoices-to-customer/:id',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getInvoiceToCustomer,
  );

  app.get(
    '/invoices-to-customer',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getInvoiceToCustomersList,
  );

  app.get(
    '/approved-invoices-to-customer',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getApprovedInvoiceToCustomersList,
  );

  app.get(
    '/not-approved-invoices-to-customer',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    getNotApprovedInvoiceToCustomersList,
  );

  app.put(
    '/invoices-to-customer/:id',
    { onRequest: [verifyJWT, verifyUserRole(['ADMIN'])] },
    updateIsApprovedInvoiceToCustomer,
  );

  app.delete(
    '/invoices-to-customer/:invoiceToCustomerId',
    {
      onRequest: [verifyJWT, verifyUserRole(['SERVICE', 'ADMIN'])],
    },
    deleteInvoiceToCustomer,
  );
}
