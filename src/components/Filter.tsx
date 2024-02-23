import { Title } from "@mantine/core";
import React from "react";

interface Props {
  title: string;
  children?: React.ReactNode;
}

const Filter: React.FC<Props> = ({ title, children }) => (
  <div>
    <Title order={4} mb={5}>
      {title}
    </Title>
    {children}
  </div>
);

export default Filter;
