import { ComboboxData } from "@mantine/core";
import { Program } from "../types/Program";

export function getProgramSelectData(programs: Program[]): ComboboxData {
  return [
    {
      group: "Majors",
      items: programs
        .filter((program) => program.degreeLevel === "BS")
        .map((program) => ({
          value: program.programGroupId,
          label: program.programTitle,
        })),
    },
    {
      group: "Minors",
      items: programs
        .filter((program) => program.degreeLevel === "MIN")
        .map((program) => ({
          value: program.programGroupId,
          label: program.programTitle,
        })),
    },
  ];
}
