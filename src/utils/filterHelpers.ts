import { getCourseGroupIdsFromProgram } from ".";
import { Course } from "../types/Course";
import { CreditHours } from "../types/Credits";
import { Department, getDepartmentTitle } from "../types/Department";
import { AcademicPeriod } from "../types/Enums";
import { Program } from "../types/Program";

function isInProgramFilter(courseGroupId: string, program: Program) {
  console.log(getCourseGroupIdsFromProgram(program), courseGroupId);
  return getCourseGroupIdsFromProgram(program).includes(courseGroupId);
}

function isInCourseLevelFilter(courseNumber: string, desiredLevels: number[]) {
  const levelChar = courseNumber.charAt(0);
  return desiredLevels.map((level) => level / 100).includes(Number(levelChar));
}

/**
 * Check if a course's credit hours are one of the indicated desired credit hours.
 * A x.5 credit hour course is considered to be in the range of the whole number credit hours.
 * For example, a 1.5 credit hour course is part of both the 1 and 2 credit hour levels.
 */
function isInCreditHourFilter(
  courseCreditHours: CreditHours,
  desiredCredits: number[]
) {
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
}

function isInDepartmentsFilter(
  courseDepartments: Department[],
  desiredDepartments: Department[]
) {
  return courseDepartments.some((department) =>
    desiredDepartments.includes(department)
  );
}

function isInAcademicPeriodsFilter(
  courseAcademicPeriods: AcademicPeriod[],
  desiredAcademicPeriods: AcademicPeriod[]
) {
  console.log(courseAcademicPeriods, desiredAcademicPeriods);
  return courseAcademicPeriods.some((academicPeriod) =>
    desiredAcademicPeriods.includes(academicPeriod)
  );
}

// TODO: Improve search filter (only works on exact matches right now)
function isInSearchTextFilter(course: Course, searchText: string) {
  searchText = searchText.toLowerCase().trim();
  searchText = searchText.replace(/\s+/g, " "); // Replace all whitespace with a single space
  if (searchText.includes("cs")) {
    if (findTextInCourse(course, searchText.replace("cs", "c s"))) {
      return true;
    }
  }
  return findTextInCourse(course, searchText);
}

function findTextInCourse(course: Course, lowercaseText: string) {
  return (
    course.name.toLowerCase().includes(lowercaseText) ||
    course.longName.toLowerCase().includes(lowercaseText) ||
    course.courseNumber.toLowerCase().includes(lowercaseText) ||
    course.code.toLowerCase().includes(lowercaseText) ||
    course.description.toLowerCase().includes(lowercaseText) ||
    course.college.toLowerCase().includes(lowercaseText) ||
    course.courseTypicallyOffered.toLowerCase().includes(lowercaseText) ||
    course.departments.some((department) =>
      getDepartmentTitle(department).toLowerCase().includes(lowercaseText)
    )
  );
}

export const filterHelpers = {
  isInProgramFilter,
  isInCourseLevelFilter,
  isInCreditHourFilter,
  isInDepartmentsFilter,
  isInAcademicPeriodsFilter,
  isInSearchTextFilter,
  findTextInCourse,
};
