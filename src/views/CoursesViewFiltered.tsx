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
  TextInput,
} from "@mantine/core";
import { Course } from "../types/Course";
import { Program } from "../types/Program";
import {
  Department,
  getDepartmentCode,
  getDepartmentTitle,
} from "../types/Department";
import { CourseCardsDisplay, Filter } from "../components";
import { AcademicPeriod } from "../types/Enums";
import {
  convertToAcademicPeriods,
  getProgramSelectData,
  filterHelpers,
} from "../utils";
import { IconSearch } from "@tabler/icons-react";

type Props = {
  courses: Course[];
  programs: Program[];
};

const CoursesViewFiltered: React.FC<Props> = ({ courses, programs }) => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [searchTextFilteredCourses, setSearchTextFilteredCourses] = useState<
    Course[] | null
  >(null);
  const [searchTextFilter, setSearchTextFilter] = useState<string>("");
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
    const coursesToFilterFrom = searchTextFilteredCourses
      ? searchTextFilteredCourses
      : courses;
    const newFilteredCourses = coursesToFilterFrom.filter(
      (course) =>
        (programFilter === null ||
          filterHelpers.isInProgramFilter(
            course.courseGroupId,
            programFilter
          )) &&
        (courseLevelFilter.length === 0 ||
          filterHelpers.isInCourseLevelFilter(
            course.courseNumber,
            courseLevelFilter
          )) &&
        (departmentFilter.length === 0 ||
          filterHelpers.isInDepartmentsFilter(
            course.departments,
            departmentFilter
          )) &&
        (creditHourFilter.length === 0 ||
          filterHelpers.isInCreditHourFilter(
            course.credits.creditHours,
            creditHourFilter
          )) &&
        (academicPeriodsWhenOfferedFilter.length === 0 ||
          filterHelpers.isInAcademicPeriodsFilter(
            convertToAcademicPeriods(course.courseTypicallyOffered),
            academicPeriodsWhenOfferedFilter
          ))
    );
    setFilteredCourses(newFilteredCourses);
  }, [
    searchTextFilteredCourses,
    programFilter,
    courseLevelFilter,
    departmentFilter,
    creditHourFilter,
    academicPeriodsWhenOfferedFilter,
    courses,
  ]);

  /**
   * Update subset of filtered coureses only on searchTextFilter change.
   * Improves performance by not re-filtering everything based on search text
   * when only other filters have changed.
   */
  useEffect(() => {
    if (searchTextFilter === "") {
      setSearchTextFilteredCourses(null);
      return;
    }
    const newSearchTextFilteredCourses = courses.filter(
      (course) =>
        searchTextFilter === "" ||
        filterHelpers.isInSearchTextFilter(course, searchTextFilter)
    );
    setSearchTextFilteredCourses(newSearchTextFilteredCourses);
  }, [searchTextFilter, courses]);

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

  const searchElements = (
    <Filter title="Search">
      <TextInput
        leftSectionPointerEvents="none"
        leftSection={<IconSearch />}
        placeholder="Search anything"
        onChange={(event) => setSearchTextFilter(event.currentTarget.value)}
      />
    </Filter>
  );

  const programFilterElements = (
    <Filter
      title="Program"
      subtitle="View courses that count towards program requirements"
    >
      <Select
        data={getProgramSelectData(programs)}
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
        placeholder="Add Departments"
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
          {searchElements}
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
