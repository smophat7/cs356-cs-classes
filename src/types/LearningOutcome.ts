// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

export type LearningOutcome = {
  name: string;
  /**
   * Description of the learning outcome
   */
  objective: string;
  tags: string[];
  activity: string;
  assessment: string;
  justification: string;
};
