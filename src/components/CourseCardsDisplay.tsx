import { Flex, StyleProp } from "@mantine/core";
import { Course } from "../types/Course";
import { CourseCard } from ".";

type Props = {
  courses: Course[];
  justify?: StyleProp<React.CSSProperties["justifyContent"]>;
};

const CourseCardsDisplay: React.FC<Props> = ({
  courses,
  justify = "center",
}) => {
  return (
    <Flex gap="md" justify={justify} direction="row" wrap="wrap">
      {courses.map((course, i) => {
        return <CourseCard key={i} course={course} />;
      })}
    </Flex>
  );
};

export default CourseCardsDisplay;
