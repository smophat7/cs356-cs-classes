import React, { useEffect, useState } from "react";
import {
  Text,
  MultiSelect,
  Flex,
  ScrollArea,
  Chip,
  Group,
  Title,
  Stack,
  Container,
  ComboboxItem,
  ComboboxData,
} from "@mantine/core";
import { Course } from "../types/Course";
import { Program } from "../types/Program";
import { CreditHours } from "../types/Credits";
import {
  Department,
  getDepartmentCode,
  getDepartmentTitle,
} from "../types/Department";
import { CourseCardsDisplay } from "../components";

type Props = {
  courses: Course[];
  programs: Program[];
};

const CoursesViewFiltered: React.FC<Props> = ({ courses }) => {
  const [departmentsFilter, setDepartmentsFilter] = useState<Department[]>([]);
  const [creditHourFilter, setCreditHourFilter] = useState<string[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  // Filter courses based on filter selections
  useEffect(() => {
    const newFilteredCourses = courses.filter(
      (course) =>
        (departmentsFilter.length === 0 ||
          isInDepartmentsFilter(course.departments, departmentsFilter)) &&
        (creditHourFilter === null ||
          isInCreditHourFilter(
            course.credits.creditHours,
            creditHourFilter.map(Number)
          ))
    );
    setFilteredCourses(newFilteredCourses);
  }, [departmentsFilter, creditHourFilter, courses]);

  const isInCreditHourFilter = (
    courseCreditHours: CreditHours,
    desiredCredits: number[]
  ) => {
    if (desiredCredits.length === 0) return true;
    if (courseCreditHours.min) {
      for (
        let i = courseCreditHours.min;
        i <= courseCreditHours.value;
        i += 0.5
      ) {
        if (
          desiredCredits.includes(Math.floor(i)) ||
          desiredCredits.includes(Math.ceil(i))
        )
          return true;
      }
      return false;
    } else {
      return (
        desiredCredits.includes(Math.floor(courseCreditHours.value)) ||
        desiredCredits.includes(Math.ceil(courseCreditHours.value))
      );
    }
  };

  const isInDepartmentsFilter = (
    courseDepartments: Department[],
    desiredDepartments: Department[]
  ) => {
    return courseDepartments.some((department) =>
      desiredDepartments.includes(department)
    );
  };

  const multiSelectData: ComboboxData = Object.values(Department).map(
    (department) => ({
      group: getDepartmentTitle(department),
      items: [
        {
          value: department,
          label: getDepartmentCode(department),
        } as ComboboxItem,
      ],
    })
  );

  return (
    <Flex h="100%" direction={{ base: "column", sm: "row" }} gap={30}>
      <Container w={{ base: 250, sm: "33%", md: "25%" }} px={0}>
        <Stack>
          <div>
            <Title order={1}>Courses</Title>
            <Text size="lg">
              Explore all the courses that are part of our CS programs
            </Text>
            <Text c="dimmed">
              Showing {filteredCourses.length} of {courses.length} courses
            </Text>
          </div>
          <div>
            <Title order={4}>Departments</Title>
            <MultiSelect
              data={multiSelectData}
              value={departmentsFilter}
              onChange={(values) =>
                setDepartmentsFilter(values as Department[])
              }
              clearable
              hidePickedOptions
              searchable
            />
          </div>
          <div>
            <Title order={4}>Credit Hours</Title>
            <Chip.Group
              multiple
              value={creditHourFilter}
              onChange={setCreditHourFilter}
            >
              <Group>
                <Chip value="1">1</Chip>
                <Chip value="2">2</Chip>
                <Chip value="3">3</Chip>
                <Chip value="4">4</Chip>
              </Group>
            </Chip.Group>
          </div>
        </Stack>
      </Container>
      <ScrollArea w={{ base: "100%", sm: "67%", md: "75%" }}>
        <CourseCardsDisplay courses={filteredCourses} />
      </ScrollArea>
    </Flex>
  );
};

export default CoursesViewFiltered;
