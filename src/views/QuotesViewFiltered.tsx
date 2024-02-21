import React, { useEffect, useState } from "react";
import { Text, Container, MultiSelect, Flex, ScrollArea } from "@mantine/core";
import { Quote } from "../types/Quote";
import { QuoteCardsDisplay } from "../components";

type Props = {
  quotes: Quote[];
  mediums: string[];
  tags: string[];
  authors: string[];
  languages: string[];
};

const QuotesViewFiltered: React.FC<Props> = ({
  quotes,
  mediums,
  tags,
  authors,
  languages,
}) => {
  const [authorsFilter, setAuthorsFilter] = useState<string[]>([]);
  const [mediumsFilter, setMediumsFilter] = useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);
  const [languagesFilter, setLanguagesFilter] = useState<string[]>([]);
  const [filteredQuotes, setFilteredQuotes] = useState<Quote[]>(quotes);

  useEffect(() => {
    const newFilteredQuotes = quotes.filter(
      (quote) =>
        (authorsFilter.length === 0 || authorsFilter.includes(quote.author)) &&
        (mediumsFilter.length === 0 || mediumsFilter.includes(quote.medium)) &&
        (tagsFilter.length === 0 ||
          quote.tags.some((tag) => tagsFilter.includes(tag))) &&
        (languagesFilter.length === 0 ||
          languagesFilter.includes(quote.language))
    );
    setFilteredQuotes(newFilteredQuotes);
  }, [authorsFilter, mediumsFilter, tagsFilter, languagesFilter, quotes]);

  const handleBadgeClick = (tag: string) => {
    console.log(tag);
    setTagsFilter([tag]);
  };

  return (
    <Flex h="100%" direction={{ base: "column", sm: "row" }} gap={30}>
      <Container w={{ base: 250, sm: "33%", md: "25%" }} px={0}>
        <MultiSelect
          label="Author"
          data={authors}
          value={authorsFilter}
          onChange={setAuthorsFilter}
          clearable
          hidePickedOptions
          searchable
        />
        <MultiSelect
          label="Medium"
          data={mediums}
          value={mediumsFilter}
          onChange={setMediumsFilter}
          clearable
          hidePickedOptions
          searchable
        />
        <MultiSelect
          label="Tag"
          data={tags}
          value={tagsFilter}
          onChange={setTagsFilter}
          clearable
          hidePickedOptions
          searchable
        />
        <MultiSelect
          label="Language (original)"
          data={languages}
          value={languagesFilter}
          onChange={setLanguagesFilter}
          clearable
          hidePickedOptions
          searchable
        />
        <Text>
          {filteredQuotes.length} of {quotes.length} quotes
        </Text>
      </Container>
      <ScrollArea w={{ base: "100%", sm: "67%", md: "75%" }}>
        <QuoteCardsDisplay
          quotes={filteredQuotes}
          onBadgeClick={handleBadgeClick}
        />
      </ScrollArea>
    </Flex>
  );
};

export default QuotesViewFiltered;
