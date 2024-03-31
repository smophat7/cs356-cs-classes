import React, { useEffect, useState } from "react";

import {
  Center,
  CloseButton,
  ComboboxData,
  ComboboxItem,
  Flex,
  MultiSelect,
  ScrollArea,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { CourseCardsDisplay, Filter } from "../components";
import { Course } from "../types/Course";
import {
  Department,
  getDepartmentCode,
  getDepartmentTitle,
} from "../types/Department";
import { AcademicPeriod } from "../types/Enums";
import { Program } from "../types/Program";
import { Topic } from "../types/Topic";
import {
  convertToAcademicPeriods,
  filterHelpers,
  getProgramSelectData,
} from "../utils";

type Props = {
  courses: Course[];
  programs: Program[];
  topics: Topic[];
};

const CoursesViewFiltered: React.FC<Props> = ({
  courses,
  programs,
  topics,
}) => {
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
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

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
          )) &&
        (selectedTopic === null ||
          topics
            .find((topic) => topic.id === selectedTopic)
            ?.courseGroupIds.includes(course.courseGroupId))
    );
    setFilteredCourses(newFilteredCourses);
  }, [
    searchTextFilteredCourses,
    programFilter,
    courseLevelFilter,
    departmentFilter,
    creditHourFilter,
    academicPeriodsWhenOfferedFilter,
    selectedTopic,
    courses,
    topics,
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
        rightSection={
          <CloseButton
            onClick={() => {
              setSearchTextFilter("");
            }}
          />
        }
        placeholder="Search anything"
        value={searchTextFilter}
        onChange={(event) => setSearchTextFilter(event.currentTarget.value)}
      />
    </Filter>
  );

  const programFilterElements = (
    <Filter title="Program">
      <Select
        data={getProgramSelectData(programs)}
        value={programFilter?.programGroupId}
        onChange={(value) =>
          setProgramFilter(
            programs.find((x) => x.programGroupId === value) || null
          )
        }
        clearable
        searchable
      />
    </Filter>
  );

  const courseLevelFilterElements = (
    <Filter title="Course Level">
      <MultiSelect
        data={[100, 200, 300, 400, 500].map((value) => ({
          value: value.toString(),
          label: value.toString(),
        }))}
        value={courseLevelFilter.map((value) => value.toString())}
        onChange={(values) =>
          setCourseLevelFilter(values.map((str) => parseInt(str)))
        }
        clearable
        searchable
      />
    </Filter>
  );

  const departmentFilterElements = (
    <Filter title="Department">
      <MultiSelect
        data={departmentMultiSelectData}
        value={departmentFilter}
        onChange={(values) => setDepartmentFilter(values as Department[])}
        clearable
        searchable
      />
    </Filter>
  );

  const creditHourFilterElements = (
    <Filter title="Credit Hours">
      <MultiSelect
        data={[1, 2, 3, 4].map((value) => ({
          value: value.toString(),
          label: value.toString(),
        }))}
        value={creditHourFilter.map((value) => value.toString())}
        onChange={(values) =>
          setCreditHourFilter(values.map((str) => parseInt(str)))
        }
        clearable
        searchable
      />
    </Filter>
  );

  const academicPeriodsWhenOfferedFilterElements = (
    <Filter title="Academic Periods Offered">
      <MultiSelect
        data={[
          AcademicPeriod.FALL,
          AcademicPeriod.WINTER,
          AcademicPeriod.SPRING,
          AcademicPeriod.SUMMER,
        ].map((value) => ({
          value,
          label: value,
        }))}
        value={academicPeriodsWhenOfferedFilter}
        onChange={(values) =>
          setAcademicPeriodsWhenOfferedFilter(values as AcademicPeriod[])
        }
        clearable
        searchable
      />
    </Filter>
  );

  const topicFilterElements = (
    <Filter title="Topic">
      <Select
        data={topics.map((topic) => ({ value: topic.id, label: topic.name }))}
        value={selectedTopic}
        onChange={(value) => setSelectedTopic(value)}
        clearable
        searchable
      />
    </Filter>
  );

  return (
    <Flex h="100%" direction={{ base: "column", sm: "row" }} gap={30}>
      <ScrollArea
        h={{ base: "50%", sm: "100%" }}
        w={{ base: "100%", sm: "33%", md: "25%" }}
        px={0}
      >
        <Stack gap="sm">
          <div>
            <Title order={1}>BYU CS Courses</Title>
            <Text size="lg" lh={1.2}>
              Explore all courses that are part of our undergraduate Computer
              Science programs
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
          {topicFilterElements}
        </Stack>
      </ScrollArea>
      <ScrollArea
        h={{ base: "50%", sm: "100%" }}
        w={{ base: "100%", sm: "67%", md: "75%" }}
      >
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
