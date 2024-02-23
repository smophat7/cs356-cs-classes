import { CreditHours } from "../types/Credits";

export function getCreditHoursText(creditHours: CreditHours): string {
  if (creditHours.min && creditHours.min !== creditHours.value) {
    return `${creditHours.min} - ${creditHours.value} credits`;
  } else {
    return `${creditHours.value} ${
      creditHours.value > 1 ? "credits" : "credit"
    }`;
  }
}
