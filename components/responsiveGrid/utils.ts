import { isValid, parseISO } from "date-fns";

export function isValidDate(dateStr: any): boolean {
  if (dateStr === null || dateStr === undefined) return false;
  if (typeof dateStr !== "string") return false;

  // First try standard ISO parsing
  try {
    const date = parseISO(dateStr);
    if (isValid(date)) return true;
  } catch (e) {
    // Continue to other formats if ISO parsing fails
  }
  const regex =
    /^(?:(\d{4})[-/](\d{2})[-/](\d{2})|(\d{2})[-/](\d{2})[-/](\d{4}))$/;
  const match = dateStr.match(regex);

  if (!match) {
    return false;
  }

  let year, month, day;

  if (match[1]) {
    year = parseInt(match[1], 10);
    month = parseInt(match[2], 10);
    day = parseInt(match[3], 10);
  } else {
    day = parseInt(match[4], 10);
    month = parseInt(match[5], 10);
    year = parseInt(match[6], 10);
  }

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}
