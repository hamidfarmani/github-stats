import { useQuery } from "react-query";
import { apiClient } from "../../../util/api-client";

async function getRepositories(username) {
  const response = await apiClient.get(
    `/users/${username}/repos?per_page=100&sort=updated&direction=desc`,
    ""
  );
  return response;
}

export const useGetRepositories = (username) => {
  return useQuery(["repositories", username], () => getRepositories(username), {
    suspense: true,
    refetchOnWindowFocus: false,
    enabled: !!username,
  });
};
