import React from "react";
import { Group, Badge } from "@mantine/core";

interface Props {
  tags: string[];
  onBadgeClick?: (tag: string) => void;
  justify: React.CSSProperties["justifyContent"];
}

const TagBadges: React.FC<Props> = ({ tags, onBadgeClick, justify }) => {
  return (
    <Group justify={justify} gap={3}>
      {tags.map((tag, i) => {
        return onBadgeClick ? (
          <Badge
            key={i}
            size="sm"
            variant="light"
            component="button"
            onClick={() => onBadgeClick(tag)}
            style={{ cursor: "pointer" }}
          >
            {tag}
          </Badge>
        ) : (
          <Badge key={i} size="sm" variant="light">
            {tag}
          </Badge>
        );
      })}
    </Group>
  );
};

export default TagBadges;
