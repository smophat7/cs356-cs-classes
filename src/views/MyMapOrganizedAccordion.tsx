import React, { useEffect, useState } from "react";
import { CourseGroupedCardsDisplay, Filter } from "../components";
import { Course } from "../types/Course";
import { Program, ProgramRequirement } from "../types/Program";
import {
  ComboboxData,
  Container,
  Flex,
  ScrollArea,
  Select,
} from "@mantine/core";
import { getCourseGroupIdsFromProgram } from "../utils";

type Props = {
  courses: Course[];
  programs: Program[];
};

const MyMAPOrganizedAccordion: React.FC<Props> = ({ courses, programs }) => {
  const [programFilter, setProgramFilter] = useState<Program | null>(
    programs[0]
  );
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedProgramRequirements, setSelectedProgramRequirements] =
    useState<ProgramRequirement[]>([]);

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

  const programFilterElements = (
    <Filter
      title="Program"
      subtitle="View courses that count towards program requirements"
    >
      <Select
        data={programSelectData}
        value={programFilter?.programGroupId}
        onChange={(value) =>
          setProgramFilter(
            programs.find((x) => x.programGroupId === value) || null
          )
        }
      />
    </Filter>
  );

  return (
    <Flex h="100%" direction={{ base: "column" }} gap={24}>
      <Container>{programFilterElements}</Container>
      <ScrollArea>
        {programFilter && (
          <CourseGroupedCardsDisplay
            courses={filteredCourses}
            requirements={selectedProgramRequirements}
          />
        )}
      </ScrollArea>
    </Flex>
  );
};

export default MyMAPOrganizedAccordion;
