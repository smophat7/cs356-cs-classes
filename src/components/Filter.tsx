import React from "react";

import { Text, Title } from "@mantine/core";

interface Props {
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const Filter: React.FC<Props> = ({ title, subtitle, children }) => (
  <div>
    {title && <Title order={6}>{title}</Title>}
    {subtitle && <Text size="sm">{subtitle}</Text>}
    {children}
  </div>
);

export default Filter;
