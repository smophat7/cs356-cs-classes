import { Accordion, Center, Text, Title } from "@mantine/core";
import { Course } from "../types/Course";
import { CourseCard } from ".";

type Requirement = {
    title: string;
    description: string | null;
    note: string | null;
    courses: Course[];
    options: any[]; // You might want to define a type for options as well
};

type Props = {
  courses: Course[];
  requirements: Requirement[];
};

const CourseGroupedCardsDisplay: React.FC<Props> = ({ courses, requirements }) => {
    console.log("courses", courses);
    console.log("requirements", requirements);
    return requirements.length === 0 ? (
        <Center>
            <Title order={2}>No requirements found.</Title>
        </Center>
    ) : (
        courses.length === 0 ? (
            <Center>
                <Title>No courses found.</Title>
            </Center>
        ) : (
          <Accordion variant="separated">
            {requirements.map((requirement, index) => (
              <Accordion.Item key={index} value={requirement.title}>                
                <Accordion.Control>
                    <Text size="lg">
                        {requirement.title}
                    </Text>
                </Accordion.Control>
                <Accordion.Panel>
                    {requirement.courses.map((requirementCourse, i) => {
                        const foundCourse = courses.find(course => course._id === requirementCourse.courseGroupId);
                        return foundCourse ? (
                          <CourseCard key={i} course={foundCourse}/>
                        ) : null;
                    })}
                  </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        )
    );
};

export default CourseGroupedCardsDisplay;
