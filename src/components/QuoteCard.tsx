import {
  Card,
  Divider,
  Text,
  Group,
  Flex,
  Spoiler,
  Title,
} from "@mantine/core";
import { Quote } from "../types/Quote";
import { TagBadges, MediumIcon } from ".";

type Props = {
  quote: Quote;
  onBadgeClick?: (tag: string) => void;
};

const QuoteCard: React.FC<Props> = ({ quote, onBadgeClick }) => {
  return (
    <Card withBorder radius="md" p="md" w={{ base: 250 }} mih={250}>
      <Flex direction="column" h="100%">
        <Title order={4}>{quote.author}</Title>
        <TagBadges
          tags={quote.tags}
          onBadgeClick={onBadgeClick}
          justify="flex-start"
        />
        <Spoiler showLabel="More" hideLabel="Less" flex={1} maxHeight={150}>
          <Text>{quote.quote_content}</Text>
        </Spoiler>
      </Flex>
      <Card.Section>
        <Divider />
        <Group
          justify="space-between"
          grow
          gap={0}
          preventGrowOverflow={false}
          wrap="nowrap"
          c="dimmed"
          ta="center"
          px="xs"
        >
          <MediumIcon text={quote.medium}></MediumIcon>
          <Text>|</Text>
          <Text>{quote.date.toLocaleDateString("en-US")}</Text>
          <Text>|</Text>
          <Text>{quote.language}</Text>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default QuoteCard;
