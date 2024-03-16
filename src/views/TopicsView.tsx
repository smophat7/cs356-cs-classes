import { useState } from "react";

import { Box, Tabs, Title } from "@mantine/core";

import { CourseCardsDisplay } from "../components";
import { Course } from "../types/Course";
import { Topic } from "../types/Topic";

type Props = {
  courses: Course[];
  topics: Topic[];
};

const TopicsView: React.FC<Props> = ({ courses, topics }) => {
  const [activeTab, setActiveTab] = useState<string | null>(
    topics.length !== 0 ? topics[0].id : null
  );

  return (
    <>
      <Title order={1} pb="md">
        Topics
      </Title>
      {topics.length !== 0 ? (
        <Tabs
          value={activeTab}
          onChange={setActiveTab}
          variant="default"
          orientation="vertical"
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
      ) : (
        <p>No topics found.</p>
      )}
    </>
  );
};

export default TopicsView;
