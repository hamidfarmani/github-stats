import { Avatar, Blockquote, Button, Card, Center, createStyles, Group, rem, Text } from '@mantine/core';
import moment from "moment";
import { CalendarEvent, ExternalLink, MapPin } from 'tabler-icons-react';


const useStyles = createStyles((theme) => ({
  card: {
    width: "50%",
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  avatar: {
    border: `${rem(2)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white}`,
  },
}));

interface UserCardImageProps {
  avatar_url: string;
  name: string;
  location: string;
  created_at: string;
  html_url: string;
  bio: string;
  stats: { label: string; value: string | number }[];
}

export function DetailsCard({ avatar_url, name, location, stats, bio, created_at, html_url }: UserCardImageProps) {
  const { classes, theme } = useStyles();

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta="center" fz="lg" fw={500}>
        {stat.value}
      </Text>
      <Text ta="center" fz="sm" c="dimmed">
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <Center>
        <Card  padding="xl" radius="md" className={classes.card}>
        <Avatar src={avatar_url} size={200} radius={100} mx="auto" className={classes.avatar} />
        <Text ta="center" fz="lg" fw={500} mt="sm">
            {name}
        </Text>
        <Group position='center' >
            <Text ta="center" fz="sm" c="dimmed">
                <CalendarEvent size=".9rem" />Joined {moment(created_at).format('LL')}
            </Text>
            <Text ta="center" fz="sm" c="dimmed">
                <MapPin size=".9rem" />{location}
            </Text>
        </Group>

        <Group mt="md" position="center" spacing={40}>
            {items}
        </Group>
        <Blockquote cite={name}>{bio}</Blockquote>

        <Group position="center">
            <Button
                leftIcon={<ExternalLink size="0.9rem" />}
                fullWidth
                radius="md"
                mt="xl"
                color={theme.colorScheme === 'dark' ? undefined : 'dark'}
                component="a" href={html_url} variant="outline" 
            >
                Follow on GitHub
            </Button>
        </Group>
        </Card>
    </Center>
  );
}