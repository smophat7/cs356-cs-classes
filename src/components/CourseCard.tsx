import React, {useState} from "react";
import {
  Badge,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Text,
  Title,
  Modal,
  Button
} from "@mantine/core";

import { Course } from "../types/Course";
import { AcademicPeriod, CourseTypicallyOffered } from "../types/Enums";
import { convertToAcademicPeriods, getCreditHoursText } from "../utils";

type Props = {
  course: Course;
};

const CourseCard: React.FC<Props> = ({ course }) => {
  
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  
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
            {periodBadge("Fa", AcademicPeriod.FALL, periods)}
            {periodBadge("Wi", AcademicPeriod.WINTER, periods)}
            {periodBadge("Sp", AcademicPeriod.SPRING, periods)}
            {periodBadge("Su", AcademicPeriod.SUMMER, periods)}
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
    <Card withBorder radius="md" p="md" w={250} mih={250} shadow="md">
      <Flex direction="column" h="100%">
        <Title order={4}>{course.code}</Title>
        <Title order={6}>{course.name}</Title>
        
        <Text style={{ overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{course.description}</Text>
        <Button onClick = {toggleModal}>More</Button>
        <Modal
          title="Course Description"
          opened={modalOpen}
          onClose={toggleModal}
        >
          <Title order={4}>{course.code}</Title>
          <Title order={6}>{course.name}</Title>
          <Text>{course.description}</Text>
          <Grid c="dimmed" ta="center" px="xs" align="center" p={0}>
            <Grid.Col span={5}>
              <Text>{getCreditHoursText(course.credits.creditHours)}</Text>
            </Grid.Col>
            <Grid.Col span={7}>
              {periodsOffered(course.courseTypicallyOffered)}
            </Grid.Col>
          </Grid>
        </Modal>
                        
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
