import { Accordion, Center, Stack, Text, Title } from "@mantine/core";
import { Course } from "../types/Course";
import { CourseCardsDisplay } from ".";
import { ProgramRequirement } from "../types/Program";

type Props = {
  courses: Course[];
  requirements: ProgramRequirement[];
};

const CourseGroupedCardsDisplay: React.FC<Props> = ({
  courses,
  requirements,
}) => {
  const coursesInRequirement = (requirement: ProgramRequirement): Course[] => {
    const requiredCourses: Course[] = [];
    requirement.courses.map((requirementCourse) => {
      const foundCourse = courses.find(
        (course) => course.courseGroupId === requirementCourse.courseGroupId
      );
      if (foundCourse) {
        requiredCourses.push(foundCourse);
      }
    });
    return requiredCourses;
  };

  return requirements.length === 0 ? (
    <Center>
      <Title order={2}>No requirements found.</Title>
    </Center>
  ) : (
    <Accordion variant="separated">
      {requirements.map((requirement, index) => (
        <Accordion.Item key={index} value={requirement.title}>
          <Accordion.Control>
            <Text size="lg">{requirement.title}</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <Stack gap={10}>
              {requirement.description && (
                <Text>{requirement.description}</Text>
              )}
              {requirement.courses.length > 0 && (
                <CourseCardsDisplay
                  courses={coursesInRequirement(requirement)}
                  justify="flex-start"
                />
              )}
              {requirement.note && <Text>{requirement.note}</Text>}
              {requirement.options && requirement.options.length > 0 && (
                <CourseGroupedCardsDisplay
                  courses={courses}
                  requirements={requirement.options}
                />
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default CourseGroupedCardsDisplay;
