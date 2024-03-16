import { useState } from "react";

import {
  Box,
  Flex,
  ScrollArea,
  Tabs,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { CourseCardsDisplay } from "../components";
import { Course } from "../types/Course";
import { Topic } from "../types/Topic";

type Props = {
  courses: Course[];
  topics: Topic[];
};

const TopicsView: React.FC<Props> = ({ courses, topics }) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const [activeTab, setActiveTab] = useState<string | null>(
    topics.length !== 0 ? topics[0].id : null
  );

  return (
    <Flex h="100%" direction="column" gap={24}>
      <Title order={1}>Topics</Title>
      {topics.length !== 0 ? (
        <ScrollArea>
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="default"
            orientation={isMobile ? "horizontal" : "vertical"}
            defaultValue={topics[0].id}
          >
            <Tabs.List>
              {topics.map((topic) => {
                return (
                  <Tabs.Tab
                    key={topic.id}
                    value={topic.id}
                    styles={{
                      tabLabel:
                        activeTab !== null && topic.id == activeTab
                          ? { fontWeight: "700" }
                          : {},
                    }}
                  >
                    {topic.name}
                  </Tabs.Tab>
                );
              })}
            </Tabs.List>
            {topics.map((topic) => {
              return (
                <Tabs.Panel key={topic.id} value={topic.id}>
                  <Box px="md">
                    <Title order={3} pb="md">
                      {topic.name}
                    </Title>
                    <CourseCardsDisplay
                      courses={courses.filter((c) =>
                        topic.courseGroupIds.includes(c.courseGroupId)
                      )}
                      justify="flex-start"
                    />
                  </Box>
                </Tabs.Panel>
              );
            })}
          </Tabs>
        </ScrollArea>
      ) : (
        <p>No topics found.</p>
      )}
    </Flex>
  );
};

export default TopicsView;
