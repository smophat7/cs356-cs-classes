export type Credits = {
  creditHours: CreditHours;
  lectureHours?: LectureHours;
  labHours?: LabHours;
};

export type CreditHours = {
  min?: number;
  value: number;
  operator: string;
};

export type LectureHours = {
  value: number;
  operator: string;
};

export type LabHours = {
  value: number;
  operator: string;
};
