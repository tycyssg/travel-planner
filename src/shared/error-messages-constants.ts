export function isEnumErrorMessage(
  property: string,
  objectName: string
): string {
  return `The property: ${property} in the object: ${objectName} must be a valid enum value.`;
}

export function isNotEmptyErrorMessage(
  property: string,
  objectName: string
): string {
  return `The property: ${property} in the object: ${objectName} is required.`;
}

export function isStringErrorMessage(
  property: string,
  objectName: string
): string {
  return `The property: ${property} in the object: ${objectName} is not a valid string.`;
}

export function isDefinedErrorMessage(
  property: string,
  objectName: string
): string {
  return `The property: ${property} in the object: ${objectName} is not defined.`;
}

export function arrayNotEmptyErrorMessage(
  property: string,
  objectName: string
): string {
  return `The array: ${property} in the object: ${objectName} is empty.`;
}

export function isArrayErrorMessage(
  property: string,
  objectName: string
): string {
  return `The property: ${property} in the object: ${objectName} is not an array.`;
}
