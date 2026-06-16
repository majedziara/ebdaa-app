import { rtlSet } from "./config";

export type Direction = "ltr" | "rtl";

export function getDirection(locale: string): Direction {
  return rtlSet.has(locale) ? "rtl" : "ltr";
}
