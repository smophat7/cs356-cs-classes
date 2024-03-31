import { Navigate, Route, Routes } from "react-router-dom";

import { Center, Loader } from "@mantine/core";

import { Course } from "../types/Course";
import { Program } from "../types/Program";
import { RouteEndpoints } from "../types/RouteEndpoints";
import { Topic } from "../types/Topic";
import { CoursesViewFiltered } from "../views";

type Props = {
  courses: Course[];
  programs: Program[];
  topics: Topic[];
};

const AppRoutes: React.FC<Props> = ({ courses, programs, topics }) => {
  // If data in props are not yet loaded, do not render the routes
  if (courses.length === 0 || programs.length === 0 || topics.length === 0) {
    return (
      <Center h="100%">
        <Loader />
      </Center>
    );
  }
  return (
    <Routes>
      {/* Reroute to a page on index */}
      <Route
        path="/"
        element={<Navigate to={RouteEndpoints.Courses} replace={true} />}
      />
      {/* Reroute to a page on unknown route */}
      <Route
        path="*"
        element={<Navigate to={RouteEndpoints.Courses} replace={true} />}
      />
      <Route
        path={RouteEndpoints.Courses}
        element={
          <CoursesViewFiltered
            courses={courses}
            programs={programs}
            topics={topics}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
