import React from "react";
import {
  Card,
  Divider,
  Text,
  Group,
  Flex,
  Spoiler,
  Title,
  Badge,
  Grid,
} from "@mantine/core";
import { Course } from "../types/Course";
import { AcademicPeriod, CourseTypicallyOffered } from "../types/Enums";
import { convertToAcademicPeriods, getCreditHoursText } from "../utils";

type Props = {
  course: Course;
};

const CourseCard: React.FC<Props> = ({ course }) => {
  const periodsOffered = (courseTypicallyOffered: CourseTypicallyOffered) => {
    const periods: AcademicPeriod[] = convertToAcademicPeriods(
      courseTypicallyOffered
    );
    return (
      <Group gap={2} justify="center" wrap="nowrap">
        {courseTypicallyOffered == CourseTypicallyOffered.CONTACT_DEPT ? (
          <Text>Contact Dept.</Text>
        ) : (
          <>
            {periodBadge("F", AcademicPeriod.FALL, periods)}
            {periodBadge("W", AcademicPeriod.WINTER, periods)}
            {periodBadge("S", AcademicPeriod.SPRING, periods)}
            {periodBadge("S", AcademicPeriod.SUMMER, periods)}
          </>
        )}
      </Group>
    );
  };

  const periodBadge = (
    label: string,
    desiredPeriod: AcademicPeriod,
    options: AcademicPeriod[]
  ) => {
    return (
      <Badge
        radius="xs"
        variant={options.includes(desiredPeriod) ? "filled" : "light"}
      >
        {label}
      </Badge>
    );
  };

  return (
    <Card withBorder radius="md" p="md" w={250} mih={250}>
      <Flex direction="column" h="100%">
        <Title order={4}>{course.code}</Title>
        <Title order={6}>{course.name}</Title>
        <Spoiler showLabel="More" hideLabel="Less" flex={1} maxHeight={150}>
          <Text>{course.description}</Text>
        </Spoiler>
      </Flex>
      <Card.Section>
        <Divider />
        <Grid c="dimmed" ta="center" px="xs" align="center" p={0}>
          <Grid.Col span={5}>
            <Text>{getCreditHoursText(course.credits.creditHours)}</Text>
          </Grid.Col>
          <Grid.Col span={7}>
            {periodsOffered(course.courseTypicallyOffered)}
          </Grid.Col>
        </Grid>
      </Card.Section>
    </Card>
  );
};

export default CourseCard;
