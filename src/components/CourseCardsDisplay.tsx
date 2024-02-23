import { Center, Flex, Title } from "@mantine/core";
import { Course } from "../types/Course";
import { CourseCard } from ".";

type Props = {
  courses: Course[];
};

const CourseCardsDisplay: React.FC<Props> = ({ courses }) => {
  return courses.length === 0 ? (
    <Center>
      <Title order={2}>No courses found...</Title>
    </Center>
  ) : (
    <Flex gap="md" justify="center" direction="row" wrap="wrap">
      {courses.map((course, i) => {
        return <CourseCard key={i} course={course} />;
      })}
    </Flex>
  );
};

export default CourseCardsDisplay;
