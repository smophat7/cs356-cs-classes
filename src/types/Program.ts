export type Program = {
  programTitle: string;
  programGroupId: string;
  degreeLevel: "BS" | "MIN";
  variableCreditHourMin: string;
  variableCreditHourMax: string;
  learningOutcomes: ProgramLearningOutcomes;
  requirementsOverview: string[];
  requirements: ProgramRequirement[];
};

export type ProgramLearningOutcomes = {
  /**
   * Name : Description of the learning outcome
   */
  [key: string]: string | undefined;
};

export type RequiredCourse = {
  /**
   * Connects this requirement to a Course
   */
  courseGroupId: string;
  /**
   * A short comment on the requirement of the course.
   * e.g., "You may take up to 3.0 credit hours"
   */
  comment: string | null;
};

export type ProgramRequirement = {
  title: string;
  description: string | null;
  note: string | null;
  courses: RequiredCourse[];
  options?: ProgramRequirement[];
};
