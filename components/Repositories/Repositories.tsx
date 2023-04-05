import {
  Box,
  Center,
  SegmentedControl,
  SimpleGrid,
  Loader,
} from "@mantine/core";
import { useState, useEffect } from "react";

import { Bug, Calendar, GitFork, Star } from "tabler-icons-react";
import { useGetRepositories } from "../../pages/api/data-access/useGetRepositories";
import { RepositoryCard } from "./RepositoryCard";

export function Repositories({ login }) {
  const { data: repositories, isLoading } = useGetRepositories(login);
  const [sortedItems, setSortedItems] = useState(repositories);

  useEffect(() => {
    if (repositories) {
      setSortedItems(repositories);
    }
  }, [repositories]);

  if (isLoading) return <Loader />;

  const items = sortedItems.map((repo) => (
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

  function sortRepositories(sortBy) {
    const sortedRepos = [...repositories].sort((a, b) => {
      if (sortBy === "updated_at") {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      }
      return b[sortBy] - a[sortBy];
    });
    setSortedItems(sortedRepos);
  }

  return (
    <>
      <Center>
        <SegmentedControl
          my="sm"
          onChange={(value) => sortRepositories(value)}
          data={[
            {
              value: "updated_at",
              label: (
                <Center>
                  <Calendar size="1rem" />
                  <Box ml={10}>Updated</Box>
                </Center>
              ),
            },
            {
              value: "stargazers_count",
              label: (
                <Center>
                  <Star size="1rem" />
                  <Box ml={10}>Star</Box>
                </Center>
              ),
            },
            {
              value: "forks_count",
              label: (
                <Center>
                  <GitFork size="1rem" />
                  <Box ml={10}>Fork</Box>
                </Center>
              ),
            },
            {
              value: "open_issues_count",
              label: (
                <Center>
                  <Bug size="1rem" />
                  <Box ml={10}>Issues</Box>
                </Center>
              ),
            },
          ]}
        />
      </Center>
      <SimpleGrid cols={3}>{items}</SimpleGrid>;
    </>
  );
}
