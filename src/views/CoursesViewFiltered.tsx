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
  Select,
  Center,
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
import {
  convertToAcademicPeriods,
  getCourseGroupIdsFromProgram,
} from "../utils";

type Props = {
  courses: Course[];
  programs: Program[];
};

const CoursesViewFiltered: React.FC<Props> = ({ courses, programs }) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [programFilter, setProgramFilter] = useState<Program | null>(null);
  const [courseLevelFilter, setCourseLevelFilter] = useState<number[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<Department[]>([]);
  const [creditHourFilter, setCreditHourFilter] = useState<number[]>([]);
  const [
    academicPeriodsWhenOfferedFilter,
    setAcademicPeriodsWhenOfferedFilter,
  ] = useState<AcademicPeriod[]>([]);

  // Filter courses based on filter selections
  useEffect(() => {
    const newFilteredCourses = courses.filter(
      (course) =>
        (programFilter === null ||
          isInProgramFilter(course.courseGroupId, programFilter)) &&
        (courseLevelFilter.length === 0 ||
          isInCourseLevelFilter(course.courseNumber, courseLevelFilter)) &&
        (departmentFilter.length === 0 ||
          isInDepartmentsFilter(course.departments, departmentFilter)) &&
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
    programFilter,
    courseLevelFilter,
    departmentFilter,
    creditHourFilter,
    academicPeriodsWhenOfferedFilter,
    courses,
  ]);

  const isInProgramFilter = (courseGroupId: string, program: Program) => {
    console.log(getCourseGroupIdsFromProgram(program), courseGroupId);
    return getCourseGroupIdsFromProgram(program).includes(courseGroupId);
  };

  const isInCourseLevelFilter = (
    courseNumber: string,
    desiredLevels: number[]
  ) => {
    const levelChar = courseNumber.charAt(0);
    return desiredLevels
      .map((level) => level / 100)
      .includes(Number(levelChar));
  };

  /**
   * Check if a course's credit hours are one of the indicated desired credit hours.
   * A x.5 credit hour course is considered to be in the range of the whole number credit hours.
   * For example, a 1.5 credit hour course is part of both the 1 and 2 credit hour levels.
   */
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

  const programSelectData: ComboboxData = [
    {
      group: "Majors",
      items: programs
        .filter((program) => program.degreeLevel === "BS")
        .map((program) => ({
          value: program.programGroupId,
          label: program.programTitle,
        })),
    },
    {
      group: "Minors",
      items: programs
        .filter((program) => program.degreeLevel === "MIN")
        .map((program) => ({
          value: program.programGroupId,
          label: program.programTitle,
        })),
    },
  ];

  const departmentMultiSelectData: ComboboxData = Object.values(Department).map(
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

  const programFilterElements = (
    <Filter
      title="Program"
      subtitle="View courses that count towards program requirements"
    >
      <Select
        data={programSelectData}
        placeholder="All Programs"
        value={programFilter?.programGroupId}
        onChange={(value) =>
          setProgramFilter(
            programs.find((x) => x.programGroupId === value) || null
          )
        }
        clearable
      />
    </Filter>
  );

  const courseLevelFilterElements = (
    <Filter title="Course Level">
      <Chip.Group
        multiple
        value={courseLevelFilter.map((value) => value.toString())}
        onChange={(values) => setCourseLevelFilter(values.map(Number))}
      >
        <Group>
          <Chip value="100">100</Chip>
          <Chip value="200">200</Chip>
          <Chip value="300">300</Chip>
          <Chip value="400">400</Chip>
          <Chip value="500">500</Chip>
        </Group>
      </Chip.Group>
    </Filter>
  );

  const departmentFilterElements = (
    <Filter title="Department">
      <MultiSelect
        data={departmentMultiSelectData}
        value={departmentFilter}
        onChange={(values) => setDepartmentFilter(values as Department[])}
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
    <Filter
      title="Typically Offered"
      subtitle="Check MyMap for semester-specific course offerings"
    >
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
              Explore all courses that are part of our undergraduate CS programs
            </Text>
            <Text c="dimmed">
              Showing {filteredCourses.length} of {courses.length} courses
            </Text>
          </div>
          {programFilterElements}
          {courseLevelFilterElements}
          {departmentFilterElements}
          {creditHourFilterElements}
          {academicPeriodsWhenOfferedFilterElements}
        </Stack>
      </Container>
      <ScrollArea w={{ base: "100%", sm: "67%", md: "75%" }}>
        {filteredCourses.length === 0 ? (
          <Center>
            <Title order={2}>No courses found...</Title>
          </Center>
        ) : (
          <CourseCardsDisplay courses={filteredCourses} />
        )}
      </ScrollArea>
    </Flex>
  );
};

export default CoursesViewFiltered;
