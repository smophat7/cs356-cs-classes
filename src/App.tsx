import "@mantine/core/styles.css";

import { useEffect, useState } from "react";

import { AppShell, MantineProvider } from "@mantine/core";

import { AppHeader, AppRoutes } from "./components";
import rawCourses from "./data/courses.json";
import rawPrograms from "./data/programs.json";
import rawTopics from "./data/topics.json";
import { theme } from "./theme";
import { Course } from "./types/Course";
import { Program } from "./types/Program";
import { Topic } from "./types/Topic";

export default function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    setCourses(rawCourses as Course[]);
    setPrograms(rawPrograms as Program[]);
    setTopics(rawTopics as Topic[]);
  }, []);

  return (
    <MantineProvider theme={theme}>
      <AppShell header={{ height: 60 }} padding="md">
        <AppHeader />
        <AppShell.Main h="100dvh">
          <AppRoutes courses={courses} programs={programs} topics={topics} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
