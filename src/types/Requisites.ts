// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

import { Rule } from "./Rule";

export type Requisites = {
  requisitesSimple?: RequisiteSimple[];
};

export type RequisiteSimple = {
  name: "Prerequisites";
  type: "Prerequisite";
  id: string;
  showInCatalog: boolean;
  rules: Rule[];
};
