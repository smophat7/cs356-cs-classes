import "@mantine/core/styles.css";
import { AppShell, Center, MantineProvider, Text } from "@mantine/core";
import { theme } from "./theme";
import rawQuotes from "./data/quotes.json";
import rawCategorizations from "./data/tagCategories.json";
import footerText from "./data/footer_text.json";
import {
  TopLevelCategory,
  RawCategorizations,
  Subcategory,
} from "./types/Categories";
import { useLocation } from "react-router-dom";
import { convertToQuote, convertToCategories } from "./utils";
import { Quote } from "./types/Quote";
import { RouteEndpoints } from "./types/RouteEndpoints";
import { AppHeader, AppRoutes, CategoryNavbar } from "./components";
import { useEffect, useState } from "react";

function getFooterText(): string {
  const options = footerText.options;
  return options[Math.floor(Math.random() * options.length)];
}

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(true);
  const location = useLocation();
  const isMethod1 = location.pathname === RouteEndpoints.Method1;
  const isMethod3 = location.pathname === RouteEndpoints.Method3;
  const footer = getFooterText();
  const [topLevelCategories, setTopLevelCategories] = useState<
    TopLevelCategory[]
  >([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>({
    title: "",
    tags: [],
  });
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [mediums, setMediums] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    setQuotes(rawQuotes.map(convertToQuote));
    setTopLevelCategories(
      convertToCategories(rawCategorizations as RawCategorizations)
    );
  }, []);

  useEffect(() => {
    if (topLevelCategories.length > 0) {
      setSelectedSubcategory(topLevelCategories[0].subcategories[0]);
    }
  }, [topLevelCategories]);

  useEffect(() => {
    setMediums(Array.from(new Set(quotes.map((quote) => quote.medium))));
    setTags(Array.from(new Set(quotes.flatMap((quote) => quote.tags))));
    setAuthors(Array.from(new Set(quotes.map((quote) => quote.author))));
    setLanguages(Array.from(new Set(quotes.map((quote) => quote.language))));
  }, [quotes]);

  const handleSelectSubcategory = (subcategory: Subcategory) => {
    setNavbarOpen(false);
    setSelectedSubcategory(subcategory);
  };

  return (
    <MantineProvider theme={theme}>
      <AppShell
        header={{ height: 60 }}
        {...(isMethod3 && {
          // only show the navbar for method 3
          navbar: {
            width: 300,
            breakpoint: "xs",
            collapsed: { mobile: !navbarOpen },
          },
        })}
        footer={{ height: { base: 55, sm: 40, md: 25 } }}
        padding="md"
      >
        <AppHeader isNavbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        {isMethod3 && (
          <CategoryNavbar
            topLevelCategories={topLevelCategories}
            onSelectSubcategory={handleSelectSubcategory}
          />
        )}
        <AppShell.Main h={isMethod1 ? "100dvh" : "inherit"}>
          <AppRoutes
            quotes={quotes}
            mediums={mediums}
            tags={tags}
            authors={authors}
            languages={languages}
            topLevelCategories={topLevelCategories}
            selectedSubcategory={selectedSubcategory}
          />
        </AppShell.Main>
        <AppShell.Footer>
          <Center h="100%">
            <Text ta="center" size="xs" p={3}>
              {footer} (this notice also by ChatGPT).
            </Text>
          </Center>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}
