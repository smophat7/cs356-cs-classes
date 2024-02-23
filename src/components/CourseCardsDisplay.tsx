import { Flex } from "@mantine/core";
import { Course } from "../types/Course";
import { CourseCard } from ".";

type Props = {
  courses: Course[];
};

const CourseCardsDisplay: React.FC<Props> = ({ courses }) => {
  return (
    <Flex gap="md" justify="center" direction="row" wrap="wrap">
      {courses.map((course, i) => {
        return <CourseCard key={i} course={course} />;
      })}
    </Flex>
  );
};

export default CourseCardsDisplay;
