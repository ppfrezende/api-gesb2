export class ResourceCannotBeDeletedError extends Error {
  constructor() {
    super('Resource cannot be deleted.');
  }
}
