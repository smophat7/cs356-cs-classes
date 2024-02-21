import { Flex } from "@mantine/core";
import { QuoteCard } from ".";
import { Quote } from "../types/Quote";

type Props = {
  quotes: Quote[];
  onBadgeClick?: (tag: string) => void;
};

const QuoteCardsDisplay: React.FC<Props> = ({ quotes, onBadgeClick }) => {
  return (
    <Flex gap="md" justify="center" direction="row" wrap="wrap">
      {quotes.map((quote, i) => {
        return <QuoteCard key={i} quote={quote} onBadgeClick={onBadgeClick} />;
      })}
    </Flex>
  );
};

export default QuoteCardsDisplay;
