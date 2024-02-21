import { Quote } from "../types/Quote";

export function getQuotesWithTags(quotes: Quote[], tagsToMatch: string[]) {
  return quotes.filter((quote) => {
    return quote.tags.some((tag: string) => tagsToMatch.includes(tag));
  });
}
