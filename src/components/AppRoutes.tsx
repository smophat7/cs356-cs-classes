import { Routes, Route, Navigate } from "react-router-dom";
import { CoursesViewFiltered } from "../views";
import { Course } from "../types/Course";
import { Program } from "../types/Program";
import MyMAPOrganizedAccordion from "../views/MyMapOrganizedAccordion";
import { RouteEndpoints } from "../types/RouteEndpoints";

type Props = {
  courses: Course[];
  programs: Program[];
};

const AppRoutes: React.FC<Props> = ({ courses, programs }) => {
  return (
    <Routes>
      {/* Reroute to a page on index */}
      <Route
        path="/"
        element={<Navigate to={RouteEndpoints.Courses} replace={true} />}
      />
      <Route
        path={RouteEndpoints.Courses}
        element={<CoursesViewFiltered courses={courses} programs={programs} />}
      />
      <Route
        path={RouteEndpoints.Requirements}
        element={
          <MyMAPOrganizedAccordion courses={courses} programs={programs} />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
