import { prop } from "./getProperty"
import { normalizeProperties } from "./normalizeProperties"
import { removeEmptyFields } from "./removeEmptyFields"

export const common = {
  removeEmptyFields,
  getProperty: prop,
  normalizeProperties,
}

