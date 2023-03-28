import { SimpleGrid, Text } from "@mantine/core";
import { useGetRepositories } from "../../pages/api/data-access/useGetRepositories";
import { RepositoryCard } from "./RepositoryCard";

export function Repositories() {
  const { data: repositories, isLoading } = useGetRepositories("hamidfarmani");

  if (isLoading) return <Text>Loading</Text>;

  console.log(repositories);

  const items = repositories.map((repo) => (
    <RepositoryCard
      key={repo.id}
      name={repo.name}
      url={repo.html_url}
      language={repo.language}
      description={repo.description}
      stars={repo.stargazers_count}
      forks={repo.forks_count}
      issues={repo.open_issues_count}
    />
  ));

  return (
    <>
      <SimpleGrid cols={4}>{items}</SimpleGrid>;
    </>
  );
}
