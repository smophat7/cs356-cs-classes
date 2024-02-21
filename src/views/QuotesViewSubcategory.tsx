import { Box, Center, Stack, Title } from "@mantine/core";
import { QuoteCardsDisplay, TagBadges } from "../components";
import { Subcategory } from "../types/Categories";
import { Quote } from "../types/Quote";
import { getQuotesWithTags } from "../utils";

type Props = {
  quotes: Quote[];
  subcategory: Subcategory;
};

const QuotesViewSubcategory: React.FC<Props> = ({ quotes, subcategory }) => {
  return (
    <Box>
      <Center
        bg="white"
        pos="sticky"
        py="md"
        mt="-md"
        style={{
          top: `var(--app-shell-header-height)`,
          zIndex: 1,
        }}
      >
        <Stack gap={3}>
          <Title order={2} ta="center">
            {subcategory.title}
          </Title>
          <TagBadges tags={subcategory.tags} justify="center" />
        </Stack>
      </Center>
      <QuoteCardsDisplay quotes={getQuotesWithTags(quotes, subcategory.tags)} />
    </Box>
  );
};

export default QuotesViewSubcategory;
