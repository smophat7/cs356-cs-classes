import { Title, Text } from "@mantine/core";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Filter: React.FC<Props> = ({ title, subtitle, children }) => (
  <div>
    <Title order={4}>{title}</Title>
    <Text size="sm" mb={5}>
      {subtitle}
    </Text>
    {children}
  </div>
);

export default Filter;
