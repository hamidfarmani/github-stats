import { useQuery } from "react-query";
import { apiClient } from "../../../util/api-client";

async function getRepositories(username) {
  const response = await apiClient.get(
    `/users/${username}/repos?per_page=100`,
    ""
  );
  return response;
}

export const useGetRepositories = (username) => {
  return useQuery(["user", username], () => getRepositories(username), {
    suspense: true,
    refetchOnWindowFocus: false,
    enabled: !!username,
  });
};
