import { InvoiceToCustomer, Prisma } from '@prisma/client';

export interface InvoicesToCustomerRepository {
  findById(id: string | undefined): Promise<InvoiceToCustomer | null>;
  listMany(page: number): Promise<InvoiceToCustomer[]>;
  listManyApproved(page: number): Promise<InvoiceToCustomer[]>;
  listManyNotApproved(page: number): Promise<InvoiceToCustomer[]>;
  create(
    data: Prisma.InvoiceToCustomerUncheckedCreateInput,
  ): Promise<InvoiceToCustomer>;
  delete(id: string): Promise<unknown>;
  update(
    id: string,
    data: Prisma.InvoiceToCustomerUpdateInput,
  ): Promise<InvoiceToCustomer | null>;
}
