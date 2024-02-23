// Types inferred from the following API endpoints, specific to our data set:
// - https://app.coursedog.com/api/v1/byu/general/courseTemplate/questions
// - https://app.coursedog.com/api/v1/cm/byu/courses/search/%24filters?subjectCode=C%20S (and other filters)

export enum CourseTypicallyOffered {
  FALL = "Fall",
  WINTER = "Winter",
  SPRING = "Spring Term",
  SUMMER = "Summer Term",
  SPRING_SUMMER = "Spring and Summer Terms",
  FALL_WINTER = "Fall and Winter",
  FALL_WINTER_SPRING = "Fall, Winter, and Spring",
  FALL_WINTER_SUMMER = "Fall, Winter, and Summer",
  FALL_WINTER_SPRINGSUMMER_SPRING_SUMMER = "Fall; Winter; Spring-Summer; Spring; Summer",
  ALL = "All Semesters/Terms",
  CONTACT_DEPT = "Contact Department",
  WINTER_ODD_SPRING_EVEN = "Winter odd years, Spring even years",
  FALL_EVEN = "Fall Even Years",
  FALL_ODD = "Fall Odd Years",
  WINTER_EVEN = "Winter Even Years",
  WINTER_ODD = "Winter Odd Years",
  SPRING_EVEN = "Spring Term Even Years",
  SPRING_ODD = "Spring Term Odd Years",
  SUMMER_EVEN = "Summer Term Even Years",
  SUMMER_ODD = "Summer Term Odd Years",
  FALL_TERM_1 = "Fall Term 1",
  FALL_TERM_2 = "Fall Term 2",
  WINTER_TERM_1 = "Winter Term 1",
  WINTER_TERM_2 = "Winter Term 2",
  FALL_AND_WINTER_TERM_1 = "Fall Term 1; Winter Term 1",
  FALL_AND_WINTER_EACH_TERM = "Fall Term 1; Fall Term 2; Winter Term 1; Winter Term 2",
}

export enum AcademicPeriod {
  FALL = "Fall",
  WINTER = "Winter",
  SPRING = "Spring",
  SUMMER = "Summer",
}

export enum Attribute {
  FEE = "CLASS FEE",
  LIMITATION = "LIMITATION",
  GE_AREA = "GE AREA",
}

export enum CourseType {
  A = "A - Regular Lecture",
  B = "B - Credit Lab",
  C = "C - Combined Lecture and Activity",
  G = "G - Thesis/Dissertation",
  H = "H - Seminar",
  I = "I - Research",
  J = "J - Special Problems/Projects",
  K = "K - Reading, Conferences, Reports",
  L = "L - Student Teaching",
  M = "M - Internship",
  N = "N - Practicum",
  P = "P - Private Instruction",
  S = "S - Varsity Sports",
  V = "V - Remedial (non-credit)",
  W = "W - Web Course",
  X = "X - Special Credit Only",
  Z = "Z - Other",
}

export enum Logic {
  AND = "and",
  OR = "or",
}

export enum RuleCondition {
  COMPLETED_ALL_OF = "completedAllOf",
  ANY_OF = "anyOf",
}

export enum ProgramGroupId {
  TEACHING_MINOR = "34710",
  CS_MINOR = "34711",
  CS_BASIC = "34712",
  BIO_INFORMATICS = "34713",
  ANIM_GAMES = "34714",
  PRE_ANIM_GAMES = "34715", // Doesn't really exist anymore?
  ML = "34716",
  SWE = "34717",
}

export enum RequisiteType {
  COMPLETION_REQUIREMENT = "Completion Requirement",
  PREREQUISITE = "Prerequisite",
}

export enum College {
  MSB = "Marriott School of Business",
  FHSS = "College of Family, Home, and Social Sciences",
  FINE_ARTS = "College of Fine Arts and Communications",
  HUMANITIES = "College of Humanities",
  KENNEDY = "Kennedy Center for International Studies",
  GRADUATE = "Graduate Studies",
  LAW = "J. Reuben Clark Law School",
  LIFE_SCIENCES = "College of Life Sciences",
  NURSING = "College of Nursing",
  CPMS = "College of Physical and Mathematical Sciences",
  RELIGIOUS_ED = "Religious Education",
  STUDENT_LIFE = "Student Life",
  UNDERGRAD = "Undergraduate Education",
  CONT_ED = "Division of Continuing Education",
}

export enum GradeMode {
  NUMERIC = "Grade Rule 7: 1.5 - 4.0 (Numeric grade rule)",
  STANDARD = "Grade Rule 8: A, B, C, D, E, I (Standard grade rule)",
  PASS_FAIL = "Grade Rule 9: P, E, I (Pass-fail grade rule)",
  STANDARD_T = "Grade Rule 10: A, B, C, D, E, T, I (Standard grade rule with a T option)",
  PASS_FAIL_T = "Grade Rule 11: P, T, E, I (Pass-fail grade rule with a T option)",
  INCLUSIVE = "Grade Rule 12: A, B, C, D, E, P, T, I (Inclusive grade rule)",
}
