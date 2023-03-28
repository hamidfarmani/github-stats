import { Card, Group, RingProgress, Text } from "@mantine/core";
import { ExternalLink } from "tabler-icons-react";
import useRepositoryStyles from "./useRepositoryStyles";

interface CardWithStatsProps {
  url: string;
  name: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  issues: string;
}

export function RepositoryCard({
  url,
  name,
  description,
  language,
  stars,
  issues,
  forks,
}: CardWithStatsProps) {
  const { classes } = useRepositoryStyles();

  return (
    <Card
      withBorder
      padding="lg"
      className={classes.card}
      component="a"
      href={url}
      target="_blank"
    >
      <Group position="apart">
        <Text fz="sm" fw={700} className={classes.title}>
          {name}
        </Text>
        <Group spacing={5}>
          <Text fz="xs" c="dimmed">
            {language}
          </Text>
          <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
        </Group>
      </Group>
      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>
        <div>
          <Text size="xs" color="dimmed">
            Stars
          </Text>
          <Text weight={500} size="sm">
            {stars}
          </Text>
        </div>

        <div>
          <Text size="xs" color="dimmed">
            Forks
          </Text>
          <Text weight={500} size="sm">
            {forks}
          </Text>
        </div>

        <div>
          <Text size="xs" color="dimmed">
            Issues
          </Text>
          <Text weight={500} size="sm">
            {issues}
          </Text>
        </div>
      </Card.Section>
    </Card>
  );
}
