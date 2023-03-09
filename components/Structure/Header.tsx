
import { ColorSchemeToggle } from "../ToggleScheme/ColorSchemeToggle";
import Logo from "./Logo";

import { ActionIcon, Container, createStyles, Group, Header, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import moment from "moment";
import { BrandGithub, BrandLinkedin, BrandYoutube } from "tabler-icons-react";
import { useGetRateLimit } from "../../pages/api/data-access/useGetRateLimit";

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,

    [theme.fn.smallerThan('sm')]: {
      justifyContent: 'flex-start',
    },
  },

  links: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  social: {
    width: 260,

    [theme.fn.smallerThan('sm')]: {
      width: 'auto',
      marginLeft: 'auto',
    },
  },

  burger: {
    marginRight: theme.spacing.md,

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${8} ${12}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

export function HeaderMiddle() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes, cx } = useStyles();


  const { data: rateLimit, isLoading } = useGetRateLimit();



  return (
    <Header height={56} mb={20}>
      <Container className={classes.inner}>
        <Group className={classes.links} spacing={5}>
          <Logo />
        </Group>

        <Group position="center">
            <Text color="dimmed">{rateLimit.used} out of {rateLimit.limit} requests<Text>Resets {moment.unix(rateLimit.reset).fromNow()}</Text></Text>
            
        </Group>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon size="lg" component="a" href="https://www.youtube.com/@hamidfarmani" target="_blank" >
            <BrandYoutube size="1.1rem"  />
          </ActionIcon>
          <ActionIcon size="lg" component="a" href="https://github.com/hamidfarmani/github-stats" target="_blank">
            <BrandGithub size="1.1rem"  />
          </ActionIcon>
          <ActionIcon size="lg" component="a" href="https://www.linkedin.com/in/hamidfarmani" target="_blank">
            <BrandLinkedin size="1.1rem"  />
          </ActionIcon>
          <ColorSchemeToggle />
        </Group>
      </Container>
    </Header>
  );
}