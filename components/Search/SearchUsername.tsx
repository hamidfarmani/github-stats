import {
  Button,
  TextInput,
  TextInputProps,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ArrowRight, Search } from "tabler-icons-react";
import { useGetUser } from "../../pages/api/data-access/useGetUser";
import { User } from "../UserInfo/User";
import { Repositories } from "../Repositories/Repositories";

export function SearchUsername(props: TextInputProps) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      usernameInput: "",
    },
  });

  const [username, setUsername] = useState("");
  const { data: userInformation, isLoading: isMessagesLoading } =
    useGetUser(username);

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
            <Button
              style={{ borderRadius: "50%", height: 32, width: 32, padding: 0 }}
              color={theme.primaryColor}
              variant="filled"
              type="submit"
            >
              <ArrowRight size="1.1rem" />
            </Button>
          }
          placeholder="Search GitHub profile"
          rightSectionWidth={42}
          {...props}
          {...form.getInputProps("usernameInput")}
        />
      </form>

      {userInformation && (
        <>
          <User {...userInformation} />
          <Repositories {...userInformation} />
        </>
      )}
    </>
  );
}
