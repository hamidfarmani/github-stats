import {
  Button,
  TextInput,
  TextInputProps,
  useMantineTheme,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { ArrowRight, Search } from "tabler-icons-react";
import { useGetUser } from "../../pages/api/data-access/useGetUser";
import { Repositories } from "../Repositories/Repositories";
import { User } from "../UserInfo/User";

export function SearchUsername(props: TextInputProps) {
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      usernameInput: "",
    },
  });

  const [username, setUsername] = useState("");
  const { data: userInformation, isLoading } = useGetUser(username);

  console.log("userInformation", userInformation);

  function handleSearch() {
    setUsername(form.values.usernameInput);
  }

  if (isLoading) return <Loader />;

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
