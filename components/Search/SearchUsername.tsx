import { TextInput, TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { ArrowLeft, ArrowRight, Search } from 'tabler-icons-react';

export function SearchUsername(props: TextInputProps) {
  const theme = useMantineTheme();

  return (
    <TextInput
        mb={20}
      icon={<Search size="1.1rem" />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
          {theme.dir === 'ltr' ? (
            <ArrowRight size="1.1rem"  />
          ) : (
            <ArrowLeft size="1.1rem"  />
          )}
        </ActionIcon>
      }
      placeholder="Search GitHub profile"
      rightSectionWidth={42}
      {...props}
    />
  );
}