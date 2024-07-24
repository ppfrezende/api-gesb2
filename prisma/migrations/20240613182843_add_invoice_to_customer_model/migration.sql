-- AlterTable
ALTER TABLE "timesheets_data" ADD COLUMN     "invoiceToCustomerId" TEXT;

-- CreateTable
CREATE TABLE "invoice_to_customer" (
    "id" TEXT NOT NULL,
    "isDolarInvoice" BOOLEAN NOT NULL DEFAULT false,
    "invoice_currency_quote" INTEGER,
    "final_total" INTEGER,
    "interventionId" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userName" TEXT,
    "technicianId" TEXT,
    "siteId" TEXT,
    "customerId" TEXT,

    CONSTRAINT "invoice_to_customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvoiceToCustomerIntervention" (
    "interventionId" TEXT NOT NULL,
    "invoiceToCustomerId" TEXT NOT NULL,

    CONSTRAINT "InvoiceToCustomerIntervention_pkey" PRIMARY KEY ("interventionId","invoiceToCustomerId")
);

-- AddForeignKey
ALTER TABLE "timesheets_data" ADD CONSTRAINT "timesheets_data_invoiceToCustomerId_fkey" FOREIGN KEY ("invoiceToCustomerId") REFERENCES "invoice_to_customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_userName_fkey" FOREIGN KEY ("userName") REFERENCES "users"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_technicianId_fkey" FOREIGN KEY ("technicianId") REFERENCES "technicians"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_siteId_fkey" FOREIGN KEY ("siteId") REFERENCES "sites"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice_to_customer" ADD CONSTRAINT "invoice_to_customer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceToCustomerIntervention" ADD CONSTRAINT "InvoiceToCustomerIntervention_interventionId_fkey" FOREIGN KEY ("interventionId") REFERENCES "interventions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvoiceToCustomerIntervention" ADD CONSTRAINT "InvoiceToCustomerIntervention_invoiceToCustomerId_fkey" FOREIGN KEY ("invoiceToCustomerId") REFERENCES "invoice_to_customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
