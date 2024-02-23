import React, { useEffect, useState } from "react";
import { CourseCardsDisplay, Filter } from "../components";
import { Course } from "../types/Course";
import { Program } from "../types/Program";
import { ComboboxData, Container, Flex, ScrollArea, Select } from "@mantine/core";
import { getCourseGroupIdsFromProgram } from "../utils";

type Props = {
    courses: Course[];
    programs: Program[];
}

const MyMAPOrganizedAccordion: React.FC<Props> = ({
    courses,
    programs
}) => {
    console.log("courses", courses)
    console.log("programs", programs)
    const [programFilter, setProgramFilter] = useState<Program | null>(null);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

    useEffect(() => {
        const newFilteredCourses = courses.filter(
            (course) =>
            (programFilter === null ||
                isInProgramFilter(course.courseGroupId, programFilter)) 
        );
        setFilteredCourses(newFilteredCourses);
        }, [
        programFilter,
        courses
    ]);

    const isInProgramFilter = (courseGroupId: string, program: Program) => {
        console.log(getCourseGroupIdsFromProgram(program), courseGroupId);
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
            placeholder="None"
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

    return (
        <Flex direction={{ base: "column"}}>
            <Container>
                {programFilterElements}
            </Container>
            <br/>
            <ScrollArea>
                <CourseCardsDisplay courses={filteredCourses} />
            </ScrollArea>
        </Flex>
    );
}

export default MyMAPOrganizedAccordion;