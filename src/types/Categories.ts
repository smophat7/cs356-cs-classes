export type TopLevelCategory = {
  title: string;
  subcategories: Subcategory[];
};

export type Subcategory = {
  title: string;
  tags: string[];
};

export type RawCategorizations = {
  "Top-Level-Categories": {
    [category: string]: {
      Subcategories: {
        [subcategory: string]: string[];
      };
    };
  };
};
