export class InvoiceCannotBeGeneratedError extends Error {
  constructor() {
    super('Invoice cannot be generated.');
  }
}
