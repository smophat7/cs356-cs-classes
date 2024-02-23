import { AcademicPeriod, CourseTypicallyOffered } from "../types/Enums";

export function convertToAcademicPeriods(
  typicallyOffered: CourseTypicallyOffered
): AcademicPeriod[] {
  switch (typicallyOffered) {
    case CourseTypicallyOffered.FALL:
      return [AcademicPeriod.FALL];
    case CourseTypicallyOffered.WINTER:
      return [AcademicPeriod.WINTER];
    case CourseTypicallyOffered.SPRING:
      return [AcademicPeriod.SPRING];
    case CourseTypicallyOffered.SUMMER:
      return [AcademicPeriod.SUMMER];
    case CourseTypicallyOffered.SPRING_SUMMER:
      return [AcademicPeriod.SPRING, AcademicPeriod.SUMMER];
    case CourseTypicallyOffered.FALL_WINTER:
      return [AcademicPeriod.FALL, AcademicPeriod.WINTER];
    case CourseTypicallyOffered.FALL_WINTER_SPRING:
      return [
        AcademicPeriod.FALL,
        AcademicPeriod.WINTER,
        AcademicPeriod.SPRING,
      ];
    case CourseTypicallyOffered.FALL_WINTER_SUMMER:
      return [
        AcademicPeriod.FALL,
        AcademicPeriod.WINTER,
        AcademicPeriod.SUMMER,
      ];
    case CourseTypicallyOffered.FALL_WINTER_SPRINGSUMMER_SPRING_SUMMER:
      return [
        AcademicPeriod.FALL,
        AcademicPeriod.WINTER,
        AcademicPeriod.SPRING,
        AcademicPeriod.SUMMER,
      ];
    case CourseTypicallyOffered.ALL:
      return [
        AcademicPeriod.FALL,
        AcademicPeriod.WINTER,
        AcademicPeriod.SPRING,
        AcademicPeriod.SUMMER,
      ];
    case CourseTypicallyOffered.CONTACT_DEPT:
      return [];
    case CourseTypicallyOffered.WINTER_ODD_SPRING_EVEN:
      return [AcademicPeriod.WINTER, AcademicPeriod.SPRING];
    case CourseTypicallyOffered.FALL_EVEN:
      return [AcademicPeriod.FALL];
    case CourseTypicallyOffered.FALL_ODD:
      return [AcademicPeriod.FALL];
    case CourseTypicallyOffered.WINTER_EVEN:
      return [AcademicPeriod.WINTER];
    case CourseTypicallyOffered.WINTER_ODD:
      return [AcademicPeriod.WINTER];
    case CourseTypicallyOffered.SPRING_EVEN:
      return [AcademicPeriod.SPRING];
    case CourseTypicallyOffered.SPRING_ODD:
      return [AcademicPeriod.SPRING];
    case CourseTypicallyOffered.SUMMER_EVEN:
      return [AcademicPeriod.SUMMER];
    case CourseTypicallyOffered.SUMMER_ODD:
      return [AcademicPeriod.SUMMER];
    case CourseTypicallyOffered.FALL_TERM_1:
      return [AcademicPeriod.FALL];
    case CourseTypicallyOffered.FALL_TERM_2:
      return [AcademicPeriod.FALL];
    case CourseTypicallyOffered.WINTER_TERM_1:
      return [AcademicPeriod.WINTER];
    case CourseTypicallyOffered.WINTER_TERM_2:
      return [AcademicPeriod.WINTER];
    case CourseTypicallyOffered.FALL_AND_WINTER_TERM_1:
      return [AcademicPeriod.FALL, AcademicPeriod.WINTER];
    case CourseTypicallyOffered.FALL_AND_WINTER_EACH_TERM:
      return [AcademicPeriod.FALL, AcademicPeriod.WINTER];
    default: {
      // Exhaustive check
      const _exhaustiveCheck: never = typicallyOffered;
      return _exhaustiveCheck;
    }
  }
}
