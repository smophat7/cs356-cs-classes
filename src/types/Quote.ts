export type Quote = {
  author: string;
  tags: string[];
  medium: string;
  quote_content: string;
  date: Date;
  language: string;
};

export type RawQuote = {
  author: string;
  tags: string[];
  medium: string;
  quote_content: string;
  date: string;
  language: string;
};
