export function assertHasValue<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T {
  if (value == null)
    throw new Error(message ?? 'Assertion failed: value is null or undefined');
}
