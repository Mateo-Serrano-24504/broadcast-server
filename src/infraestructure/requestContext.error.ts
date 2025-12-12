export class RequestContextError extends Error {
  constructor(fieldName: string) {
    super(`Error when accessing the ${fieldName} field of a RequestContext`);
    this.name = 'RequestContextError';
  }
}
