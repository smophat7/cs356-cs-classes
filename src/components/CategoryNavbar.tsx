import { AppShell, NavLink } from "@mantine/core";
import { Subcategory, TopLevelCategory } from "../types/Categories";
import { useState } from "react";

type Props = {
  topLevelCategories: TopLevelCategory[];
  onSelectSubcategory: (subcategory: Subcategory) => void;
};

const CategoryNavbar: React.FC<Props> = ({
  topLevelCategories,
  onSelectSubcategory,
}) => {
  const [active, setActive] = useState([0, 0]);

  const onClickLink = (subcategory: Subcategory, i: number, j: number) => {
    setActive([i, j]);
    window.scrollTo({ top: 0, behavior: "smooth" });
    onSelectSubcategory(subcategory);
  };

  return (
    <AppShell.Navbar p="md">
      {topLevelCategories.map((category: TopLevelCategory, i) => (
        <NavLink
          key={i}
          href="#required-for-focus"
          label={category.title}
          defaultOpened
        >
          {category.subcategories.map((subcategory: Subcategory, j) => (
            <NavLink
              key={j}
              href="#required-for-focus"
              label={subcategory.title}
              onClick={() => onClickLink(subcategory, i, j)}
              active={active[0] === i && active[1] === j}
            />
          ))}
        </NavLink>
      ))}
    </AppShell.Navbar>
  );
};

export default CategoryNavbar;
