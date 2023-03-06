import { useQuery } from "react-query";
import { apiClient } from "../../../util/api-client";

async function getUser(username) {
  const response = await apiClient.get(`/users/${username}`, "");
  return response;
}

export const useGetUser = (username) => {  
  return useQuery(
    ["user", username],
    () => getUser(username),
    {
      suspense: true,
      refetchOnWindowFocus: false,
      enabled: !!username,
    }
  );
};
