import { Program } from "../types/Program";

/**
 * Gets all courseGroupIds from a program's requirements.
 */
export function getCourseGroupIdsFromProgram(program: Program): string[] {
  const courseGroupIds: string[] = [];
  program.requirements.forEach((requirement) => {
    requirement.courses.forEach((course) => {
      courseGroupIds.push(course.courseGroupId);
    });
    requirement.options.forEach((option) => {
      option.courses.forEach((course) => {
        courseGroupIds.push(course.courseGroupId);
      });
    });
  });
  return courseGroupIds;
}
