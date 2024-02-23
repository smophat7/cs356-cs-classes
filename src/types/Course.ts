// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

import {
  Attribute,
  College,
  CourseType,
  Department,
  GradeMode,
  CourseTypicallyOffered,
} from "./Enums";
import { CourseDependent, ProgramDependent } from "./Dependent";
import { LearningOutcome } from "./LearningOutcome";
import { Requisites } from "./Requisites";
import { Credits } from "./Credits";

export type Course = {
  /**
   * Different than courseGroupId, which seems to be a more consistent reference ID and
   * is unique per course, despite the name.
   */
  _id: string;
  archived: boolean;
  attributes?: Attribute[];
  /**
   * e.g., C S 235
   */
  code: string;
  college: College;
  courseDependents: CourseDependent[];
  /**
   * Unique ID of a class
   * e.g., 06809-009
   */
  courseGroupId: string;
  /**
   * e.g., 235, 301R
   */
  courseNumber: string;
  /**
   * Unix timestamp
   */
  createdAt: number;
  /**
   * Email address
   */
  createdBy: string;
  credits: Credits;
  customFields?: {
    /**
     * courseGroupId = curriculumID + titleCode
     */
    curriculumId: string;
    /**
     * courseGroupId = curriculumID + titleCode
     */
    titleCode: string;
    recommended?: string;
    courseType?: CourseType;
    /**
     * e.g., C S or CSANM
     */
    teachingArea?: string;
    typeofchange?: string;
    /**
     * Unix timestamp
     */
    lastSyncd?: number;
    "9fzcu"?: "Required" | "Elective" | "Both" | "Neither";
  };
  departments: Department[];
  /**
   * Course description
   */
  description: string;
  effectiveEndDate: string;
  effectiveStartDate: string;
  endTerm: { id: string };
  gradeMode: GradeMode;
  id?: string;
  // instructionalMethods: any[]; // unused
  /**
   * Unix timestamp
   */
  lastEditedAt: number;
  /**
   * Email address
   */
  lastEditedBy: string;
  learningOutcomes: LearningOutcome[];
  /**
   * Full course name
   * e.g., Statistical Analysis for Biologists
   */
  longName: string;
  /**
   * Abbreviated course name
   * e.g., Stat Analysis for Biologists
   */
  name: string;
  /**
   * Warning: This data seems very inconsistent with the data in `programs.json`
   * which was taken from program overview pages like https://catalog23byu.coursedog.com/programs/34711
   */
  programDependents?: ProgramDependent[][];
  requisites?: Requisites;
  startTerm: { id: string };
  status: "Active" | "Inactive";
  /**
   * e.g., C S
   */
  subjectCode: string;
  version: number;
  career: string;
  /**
   * Instructor consent?
   */
  consent: "Yes" | "No" | "";
  courseTypicallyOffered: CourseTypicallyOffered;
  // equivalentCourseGroup: string; // unused
  // gradedComponent: string; // unused
  // primaryComponent: string; // unused
  // requirementGroup: string;  // unused
  // requirementLevels: any[];  // unused
  // topics: any[]; // unused
  // campus: string; // unused
  // cipCode: string; // unused
  // dependents: any[]; // unused
  // designation: string; // unused
  // division: string;  // unused
  // dropConsent: string; // unused
  // dynamicClassDateRule: string; // unused
  // equivalentCourseGroup: string; // unused
  // hegisCode: string; // unused
  // instructionMode: string; // unused
  // instructorEdit: string;  // unused
  // location: string;  // unused
  // notes: string; // unused
  // registrationMode: string;  // unused
  // requirementDesignation: string;  // unused
  // rolloverSetting: string; // unused
  // scheduleDisplayName: string; // unused
  // tuitionGroup: string;
  // type: string;  // unused
  // allowIntegration: boolean;  // always false
};
