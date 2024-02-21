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
  const isMethod1 = location.pathname === RouteEndpoints.Method1;
  const isMethod2 = location.pathname === RouteEndpoints.Method2;
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
        <Button {...getButtonProps(RouteEndpoints.Method1, isMethod1)}>
          V1
        </Button>
        <Button {...getButtonProps(RouteEndpoints.Method2, isMethod2)}>
          V2
        </Button>
        <Button {...getButtonProps(RouteEndpoints.Method3, isMethod3, true)}>
          V3
        </Button>
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
