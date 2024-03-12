import { Program, ProgramRequirement } from "../types/Program";

/**
 * Gets all courseGroupIds from a program's requirements.
 */
export function getCourseGroupIdsFromProgram(program: Program): string[] {
  const courseGroupIds: string[] = [];
  program.requirements.forEach((requirement) => {
    courseGroupIds.push(
      ...getCourseGroupIdsFromProgramRequirement(requirement)
    );
  });
  return courseGroupIds;
}

/**
 * Gets all courseGroupIds from a program requirement.
 */
function getCourseGroupIdsFromProgramRequirement(
  requirement: ProgramRequirement
): string[] {
  const courseGroupIds: string[] = [];
  requirement.courses.forEach((course) => {
    courseGroupIds.push(course.courseGroupId);
  });
  requirement.options?.forEach((option) => {
    courseGroupIds.push(...getCourseGroupIdsFromProgramRequirement(option));
  });
  return courseGroupIds;
}
