import { Routes, Route, Navigate } from "react-router-dom";
import { CoursesViewFiltered } from "../views";
import { Course } from "../types/Course";
import { Program } from "../types/Program";
import MyMAPOrganizedAccordion from "../views/MyMapOrganizedAccordion";

type Props = {
  courses: Course[];
  programs: Program[];
};

const AppRoutes: React.FC<Props> = ({ courses, programs }) => {
  return (
    <Routes>
      {/* Reroute to Method1 on index */}
      <Route path="/" element={<Navigate to="/method1" replace={true} />} />
      <Route
        path="/method1"
        element={<CoursesViewFiltered courses={courses} programs={programs} />}
      />
      <Route
        path="/method2"
        element={<MyMAPOrganizedAccordion courses={courses} programs={programs}/>}
      />
      {/* <Route
        path="/method2"
        element={
          <QuotesViewAccordion
            quotes={quotes}
            topLevelCategories={topLevelCategories}
          />
        }
      />
      <Route
        path="/method3"
        element={
          <QuotesViewSubcategory
            quotes={quotes}
            subcategory={selectedSubcategory}
          />
        }
      /> */}
    </Routes>
  );
};

export default AppRoutes;
