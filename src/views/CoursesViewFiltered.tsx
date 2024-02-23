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
import { CourseCardsDisplay, Filter } from "../components";
import { AcademicPeriod } from "../types/Enums";
import { convertToAcademicPeriods } from "../utils";

type Props = {
  courses: Course[];
  programs: Program[];
};

const CoursesViewFiltered: React.FC<Props> = ({ courses }) => {
  const [departmentsFilter, setDepartmentsFilter] = useState<Department[]>([]);
  const [creditHourFilter, setCreditHourFilter] = useState<number[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [
    academicPeriodsWhenOfferedFilter,
    setAcademicPeriodsWhenOfferedFilter,
  ] = useState<AcademicPeriod[]>([]);

  // Filter courses based on filter selections
  useEffect(() => {
    const newFilteredCourses = courses.filter(
      (course) =>
        (departmentsFilter.length === 0 ||
          isInDepartmentsFilter(course.departments, departmentsFilter)) &&
        (creditHourFilter.length === 0 ||
          isInCreditHourFilter(course.credits.creditHours, creditHourFilter)) &&
        (academicPeriodsWhenOfferedFilter.length === 0 ||
          isInAcademicPeriodsFilter(
            convertToAcademicPeriods(course.courseTypicallyOffered),
            academicPeriodsWhenOfferedFilter
          ))
    );
    setFilteredCourses(newFilteredCourses);
  }, [
    departmentsFilter,
    creditHourFilter,
    academicPeriodsWhenOfferedFilter,
    courses,
  ]);

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

  const isInAcademicPeriodsFilter = (
    courseAcademicPeriods: AcademicPeriod[],
    desiredAcademicPeriods: AcademicPeriod[]
  ) => {
    console.log(courseAcademicPeriods, desiredAcademicPeriods);
    return courseAcademicPeriods.some((academicPeriod) =>
      desiredAcademicPeriods.includes(academicPeriod)
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

  const departmentFilterElements = (
    <Filter title="Departments">
      <MultiSelect
        data={multiSelectData}
        value={departmentsFilter}
        onChange={(values) => setDepartmentsFilter(values as Department[])}
        clearable
        hidePickedOptions
        searchable
      />
    </Filter>
  );

  const creditHourFilterElements = (
    <Filter title="Credit Hours">
      <Chip.Group
        multiple
        value={creditHourFilter.map((value) => value.toString())}
        onChange={(values) =>
          setCreditHourFilter(values.map(Number) as number[])
        }
      >
        <Group>
          <Chip value="1">1</Chip>
          <Chip value="2">2</Chip>
          <Chip value="3">3</Chip>
          <Chip value="4">4</Chip>
        </Group>
      </Chip.Group>
    </Filter>
  );

  const academicPeriodsWhenOfferedFilterElements = (
    <Filter title="Typically Offered">
      <Chip.Group
        multiple
        value={academicPeriodsWhenOfferedFilter}
        onChange={(values) =>
          setAcademicPeriodsWhenOfferedFilter(values as AcademicPeriod[])
        }
      >
        <Group>
          <Chip value={AcademicPeriod.FALL}>{AcademicPeriod.FALL}</Chip>
          <Chip value={AcademicPeriod.WINTER}>{AcademicPeriod.WINTER}</Chip>
          <Chip value={AcademicPeriod.SPRING}>{AcademicPeriod.SPRING}</Chip>
          <Chip value={AcademicPeriod.SUMMER}>{AcademicPeriod.SUMMER}</Chip>
        </Group>
      </Chip.Group>
    </Filter>
  );

  return (
    <Flex h="100%" direction={{ base: "column", sm: "row" }} gap={30}>
      <Container w={{ base: 250, sm: "33%", md: "25%" }} px={0}>
        <Stack gap={24}>
          <div>
            <Title order={1}>Courses</Title>
            <Text size="lg">
              Explore all the courses that are part of our CS programs
            </Text>
            <Text c="dimmed">
              Showing {filteredCourses.length} of {courses.length} courses
            </Text>
          </div>
          {departmentFilterElements}
          {creditHourFilterElements}
          {academicPeriodsWhenOfferedFilterElements}
        </Stack>
      </Container>
      <ScrollArea w={{ base: "100%", sm: "67%", md: "75%" }}>
        <CourseCardsDisplay courses={filteredCourses} />
      </ScrollArea>
    </Flex>
  );
};

export default CoursesViewFiltered;
