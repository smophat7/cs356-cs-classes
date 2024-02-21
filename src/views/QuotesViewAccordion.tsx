import {
  Accordion,
  Container,
  Divider,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Subcategory, TopLevelCategory } from "../types/Categories";
import { Quote } from "../types/Quote";
import { TagBadges, QuoteCardsDisplay } from "../components";
import { getQuotesWithTags } from "../utils";

type Props = {
  quotes: Quote[];
  topLevelCategories: TopLevelCategory[];
};

const QuotesViewAccordion: React.FC<Props> = ({
  quotes,
  topLevelCategories,
}) => {
  const subCategoryItems = (subcategories: Subcategory[]) => {
    return subcategories.map((subcategory: Subcategory, i) => {
      return (
        <Accordion.Item value={subcategory.title} key={i}>
          <Accordion.Control>
            <Text size="lg" fw={500}>
              {subcategory.title}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <TagBadges tags={subcategory.tags} justify="flex-start" />
            <Space h="md" />
            <QuoteCardsDisplay
              quotes={getQuotesWithTags(quotes, subcategory.tags)}
            />
          </Accordion.Panel>
        </Accordion.Item>
      );
    });
  };

  const topLevelCategoryItems = topLevelCategories.map(
    (category: TopLevelCategory, i) => {
      return (
        <div key={i}>
          <Container>
            <Title order={2} mb="xs">
              {category.title}
            </Title>
            <Accordion variant="separated">
              {subCategoryItems(category.subcategories)}
            </Accordion>
          </Container>
          {i !== topLevelCategories.length - 1 && (
            <Container my="lg">
              <Divider />
            </Container>
          )}
        </div>
      );
    }
  );

  return <>{topLevelCategoryItems}</>;
};

export default QuotesViewAccordion;
