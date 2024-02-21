import { Routes, Route, Navigate } from "react-router-dom";
import { Subcategory, TopLevelCategory } from "../types/Categories";
import { Quote } from "../types/Quote";
import {
  QuotesViewAccordion,
  QuotesViewFiltered,
  QuotesViewSubcategory,
} from "../views";

type Props = {
  quotes: Quote[];
  mediums: string[];
  tags: string[];
  authors: string[];
  languages: string[];
  topLevelCategories: TopLevelCategory[];
  selectedSubcategory: Subcategory;
};

const AppRoutes: React.FC<Props> = ({
  quotes,
  mediums,
  tags,
  authors,
  languages,
  topLevelCategories,
  selectedSubcategory,
}) => {
  return (
    <Routes>
      {/* Reroute to Method1 on index */}
      <Route path="/" element={<Navigate to="/method1" replace={true} />} />
      <Route
        path="/method1"
        element={
          <QuotesViewFiltered
            quotes={quotes}
            mediums={mediums}
            tags={tags}
            authors={authors}
            languages={languages}
          />
        }
      />
      <Route
        path="/method2"
        element={
          <QuotesViewAccordion
            quotes={quotes}
            topLevelCategories={topLevelCategories}
          />
        }
      />
      <Route
        path="/method3"
        element={
          <QuotesViewSubcategory
            quotes={quotes}
            subcategory={selectedSubcategory}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
