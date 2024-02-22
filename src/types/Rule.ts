// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

import { RuleCondition, Logic } from "./Enums";

export type Rule = {
  condition: RuleCondition;
  value: {
    id: string;
    name: string;
    condition: string; // courses
    values: [
      {
        logic: Logic;
        /**
         * courseGroupIds (except for one case where it is "MATH 313"...)
         */
        value: string[];
      }
    ];
  };
  subRules: Rule[];
  name: string;
  id: string;
};
