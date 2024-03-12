import React, { useEffect, useState } from "react";
import { CourseGroupedCardsDisplay, Filter } from "../components";
import { Course } from "../types/Course";
import { Program, ProgramRequirement } from "../types/Program";
import {
  Center,
  Container,
  Flex,
  Loader,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import { getCourseGroupIdsFromProgram, getProgramSelectData } from "../utils";

type Props = {
  courses: Course[];
  programs: Program[];
};

const MyMAPOrganizedAccordion: React.FC<Props> = ({ courses, programs }) => {
  const [programFilter, setProgramFilter] = useState<Program | null>(
    programs[0] || null
  );
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedProgramRequirements, setSelectedProgramRequirements] =
    useState<ProgramRequirement[] | null>(null);

  useEffect(() => {
    const newFilteredCourses = courses.filter(
      (course) =>
        programFilter === null ||
        isInProgramFilter(course.courseGroupId, programFilter)
    );
    setFilteredCourses(newFilteredCourses);
    // Set the selected program's requirements array
    if (programFilter) {
      setSelectedProgramRequirements(programFilter.requirements || []);
    } else {
      setSelectedProgramRequirements([]);
    }
  }, [programFilter, courses]);

  const isInProgramFilter = (courseGroupId: string, program: Program) => {
    return getCourseGroupIdsFromProgram(program).includes(courseGroupId);
  };

  const programFilterElements = (
    <Filter
      title="Program"
      subtitle="View courses that count towards program requirements"
    >
      <Select
        data={getProgramSelectData(programs)}
        value={programFilter?.programGroupId}
        onChange={(value) =>
          setProgramFilter(
            programs.find((x) => x.programGroupId === value) || null
          )
        }
        allowDeselect={false}
      />
    </Filter>
  );

  return (
    <Flex h="100%" direction={{ base: "column" }} gap={24}>
      <Container>{programFilterElements}</Container>
      {programFilter ? (
        <Text size="lg" fw={500}>
          {`Total Credits: ${programFilter.variableCreditHourMin} `}
          {programFilter.variableCreditHourMax !==
            programFilter.variableCreditHourMin &&
            `- ${programFilter.variableCreditHourMax} `}
          credits
        </Text>
      ) : null}
      <ScrollArea>
        {programFilter && selectedProgramRequirements ? (
          <CourseGroupedCardsDisplay
            courses={filteredCourses}
            requirements={selectedProgramRequirements}
          />
        ) : (
          <Center>
            <Loader h="100%" />
          </Center>
        )}
      </ScrollArea>
    </Flex>
  );
};

export default MyMAPOrganizedAccordion;
