import {
  TopLevelCategory,
  Subcategory,
  RawCategorizations,
} from "../types/Categories";

export function convertToCategories(
  rawCategorizations: RawCategorizations
): TopLevelCategory[] {
  const categories: TopLevelCategory[] = [];
  for (const [category, subcategories] of Object.entries(
    rawCategorizations["Top-Level-Categories"]
  )) {
    const subcategoryArray: Subcategory[] = [];
    for (const [subcategory, tags] of Object.entries(
      subcategories.Subcategories
    )) {
      subcategoryArray.push({ title: subcategory, tags } as Subcategory);
    }
    categories.push({
      title: category,
      subcategories: subcategoryArray,
    } as TopLevelCategory);
  }
  return categories;
}
