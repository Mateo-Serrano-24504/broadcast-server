import { describe, it, expect } from 'vitest';
import { SelfNamedError } from './errors';

describe('SelfNamedError', () => {
  it('Subclasses of SelfNamedError have its name set correctly', () => {
    class SomeError extends SelfNamedError {
      constructor() {
        super('Some error');
      }
    }
    const someError = new SomeError();
    expect(someError.name).toEqual('SomeError');
  });
});
