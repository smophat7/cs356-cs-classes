import { Quote, RawQuote } from "../types/Quote";

export function convertToQuote(quote: unknown): Quote {
  if (typeof quote === "object" && quote !== null) {
    const q = quote as RawQuote;
    return {
      author: q.author,
      tags: q.tags,
      medium: q.medium,
      quote_content: q.quote_content,
      date: new Date(q.date),
      language: q.language,
    };
  }
  throw new Error("Invalid quote object");
}
