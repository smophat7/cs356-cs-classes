export enum Department {
  ARTHC = "1246",
  BIO = "1441",
  C_S = "1323",
  CHEM = "1322",
  DESAN = "1177",
  EC_EN = "1130",
  ECON = "1384",
  IS = "1517",
  LING = "1253",
  MATH = "1326",
  MMBIO = "1064",
  PHSCS = "1328",
  PWS = "1446",
  STAT = "1329",
  TMA = "1182",
  WRTG = "1238",
}

export function getDepartmentCode(value: Department): string {
  return (
    Object.keys(Department)
      .find((key) => Department[key as keyof typeof Department] === value)
      ?.replace("_", " ") ?? ""
  );
}

export function getDepartmentTitle(value: Department) {
  switch (value) {
    case Department.ARTHC:
      return "Comparative Arts and Letters";
    case Department.BIO:
      return "Biology";
    case Department.C_S:
      return "Computer Science";
    case Department.CHEM:
      return "Chemistry and Biochemistry";
    case Department.DESAN:
      return "Design";
    case Department.EC_EN:
      return "Electrical and Computer Engineering";
    case Department.ECON:
      return "Economics";
    case Department.IS:
      return "Information Systems";
    case Department.LING:
      return "Linguistics";
    case Department.MATH:
      return "Mathematics";
    case Department.MMBIO:
      return "Microbiology and Molecular Biology";
    case Department.PHSCS:
      return "Physics and Astronomy";
    case Department.PWS:
      return "Plant and Wildlife Sciences";
    case Department.STAT:
      return "Statistics";
    case Department.TMA:
      return "Theatre and Media Arts";
    case Department.WRTG:
      return "English";
    default: {
      // Exhaustive switch
      const _exhaustiveCheck: never = value;
      return _exhaustiveCheck;
    }
  }
}
