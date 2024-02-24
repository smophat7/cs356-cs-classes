import { AppShell, Group, Button, Burger } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { RouteEndpoints } from "../types/RouteEndpoints";
import { useLocation } from "react-router-dom";

type Props = {
  isNavbarOpen: boolean;
  setNavbarOpen: (value: boolean) => void;
};

const AppHeader: React.FC<Props> = ({ isNavbarOpen, setNavbarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isCoursesView = location.pathname === RouteEndpoints.Courses;
  const isRequirementsView = location.pathname === RouteEndpoints.Requirements;
  const isMethod3 = location.pathname === RouteEndpoints.Method3;

  const getButtonProps = (
    route: RouteEndpoints,
    isMethodActive: boolean,
    navbarOpen: boolean = false
  ) => ({
    onClick: () => {
      navigate(route);
      setNavbarOpen(navbarOpen);
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
        {/* <Button {...getButtonProps(RouteEndpoints.Method3, isMethod3, true)}>
          V3
        </Button> */}
        {isMethod3 && (
          <Burger
            opened={isNavbarOpen}
            onClick={() => setNavbarOpen(!isNavbarOpen)}
            hiddenFrom="xs"
            size="sm"
            ml="auto"
          />
        )}
      </Group>
    </AppShell.Header>
  );
};

export default AppHeader;
