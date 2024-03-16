import { useLocation, useNavigate } from "react-router-dom";

import { AppShell, Button, Group } from "@mantine/core";

import { RouteEndpoints } from "../types/RouteEndpoints";

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCoursesView = location.pathname === RouteEndpoints.Courses;
  const isRequirementsView = location.pathname === RouteEndpoints.Requirements;
  const isTopicsView = location.pathname === RouteEndpoints.Topics;

  const getButtonProps = (route: RouteEndpoints, isMethodActive: boolean) => ({
    onClick: () => {
      navigate(route);
    },
    variant: isMethodActive ? "filled" : "outline",
  });

  return (
    <AppShell.Header px="sm">
      <Group h="100%" gap="xs" style={{ flex: 1 }}>
        <Button {...getButtonProps(RouteEndpoints.Courses, isCoursesView)}>
          All Courses
        </Button>
        <Button
          {...getButtonProps(RouteEndpoints.Requirements, isRequirementsView)}
        >
          Requirements
        </Button>
        <Button {...getButtonProps(RouteEndpoints.Topics, isTopicsView)}>
          Topics
        </Button>
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
