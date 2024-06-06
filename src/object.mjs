import { convert } from "./convert.mjs"
export const prop = convert((obj, prop, val) => (obj[prop] = val))
