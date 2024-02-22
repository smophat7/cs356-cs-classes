// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

import { RequisiteType, ProgramGroupId } from "./Enums";

export interface Dependent {
  _id: string;
  condition: "courses";
  /**
   * courseGroupId / courseId
   */
  courseDependencyId: string;
  requisiteName: string;
  requisiteType: RequisiteType;
  showInCatalog: boolean;
  type: "requisites";
  /**
   * Abbreviated course name
   * e.g., Stat Analysis for Biologists
   */
  name: string;
  /**
   * Full course name
   * e.g., Statistical Analysis for Biologists
   */
  longName: string;
  code: string;
}

export interface CourseDependent extends Dependent {
  _id: string;
  /**
   * Sometimes matches courseGroupId, sometimes is longer
   */
  courseId: string;
  /**
   * Reliable unique ID of a class
   * e.g., 06809-009
   */
  courseGroupId: string;
  /**
   * Course code
   * e.g., C S 235
   */
  code: string;
  /**
   * e.g., C S
   */
  subjectCode: string;
  /**
   * e.g., 235, 301R
   */
  courseNumber: string;
}

export interface ProgramDependent extends Dependent {
  /**
   * Sometimes matches programGroupId, sometimes is longer
   */
  programId: string;
  /**
   * Reliable reference ID for a program
   */
  programGroupId: ProgramGroupId;
  /**
   * Don't know what this is. Doesn't seem to relate to a course's courseGroupId or _id, or code
   */
  code: string;
  /**
   * Full course name
   * e.g., Statistical Analysis for Biologists
   */
  longName: string;
}
