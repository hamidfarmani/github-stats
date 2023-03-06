import { TextInput, TextInputProps, ActionIcon, useMantineTheme, Button, Text, Loader } from '@mantine/core';
import { ArrowRight, Search } from 'tabler-icons-react';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import { useGetUser } from '../../pages/api/data-access/useGetUser';

export function SearchUsername(props: TextInputProps) {
  const theme = useMantineTheme();


  const form = useForm({
    initialValues: {
      usernameInput: '',
    },
  });

  const [username, setUsername] = useState('');
  const { data: userInformation, isLoading: isMessagesLoading } = useGetUser(username);



  
  function handleSearch() {  
    setUsername(form.values.usernameInput);
  }


  return (
    <>
      <form onSubmit={form.onSubmit(handleSearch)}>
        <TextInput
            mb={20}
            
          icon={<Search size="1.1rem" />}
          radius="xl"
          size="md"
          rightSection={
            <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled"
            component={Button} type="submit">
                <ArrowRight size="1.1rem"  />
            </ActionIcon>
          }
          placeholder="Search GitHub profile"
          rightSectionWidth={42}
          {...props}
          {...form.getInputProps("usernameInput")}
        />
        </form>

        {userInformation && (
          <div>
            <h1>{userInformation.name}</h1>
            <p>{userInformation.bio}</p>
          </div>
        )}    
      </>
      
  );
}