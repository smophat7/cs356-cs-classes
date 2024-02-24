import "@mantine/core/styles.css";
import { AppShell, MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import rawCourses from "./data/courses.json";
import rawPrograms from "./data/programs.json";
import { useLocation } from "react-router-dom";
import { RouteEndpoints } from "./types/RouteEndpoints";
import { AppHeader, AppRoutes } from "./components";
import { useEffect, useState } from "react";
import { Course } from "./types/Course";
import { Program } from "./types/Program";

export default function App() {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(true);

  const location = useLocation();
  const isCoursesView = location.pathname === RouteEndpoints.Courses;
  // const [topLevelCategories, setTopLevelCategories] = useState<
  //   TopLevelCategory[]
  // >([]);
  // const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>({
  //   title: "",
  //   tags: [],
  // });
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    setCourses(rawCourses as Course[]);
    setPrograms(rawPrograms as Program[]);
  }, []);

  // useEffect(() => {
  //   setQuotes(rawQuotes.map(convertToQuote));
  //   setTopLevelCategories(
  //     convertToCategories(rawCategorizations as RawCategorizations)
  //   );
  // }, []);

  // useEffect(() => {
  //   if (topLevelCategories.length > 0) {
  //     setSelectedSubcategory(topLevelCategories[0].subcategories[0]);
  //   }
  // }, [topLevelCategories]);

  return (
    <MantineProvider theme={theme}>
      {/* <AppShell
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
        )} */}
      <AppShell header={{ height: 60 }} padding="md">
        <AppHeader isNavbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
        <AppShell.Main h={isCoursesView ? "100dvh" : "inherit"}>
          <AppRoutes courses={courses} programs={programs} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
