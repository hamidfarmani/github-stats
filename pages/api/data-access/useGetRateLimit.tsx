import { useQuery } from "react-query";
import { apiClient } from "../../../util/api-client";

async function getRateLimit() {
  const response = await apiClient.get(`/rate_limit`, "");
  return response && response.resources.core;
}

export const useGetRateLimit = () => {
  return useQuery(
    ["rate_limit"],
    () => getRateLimit(),
    {
      suspense: true,
    }
  );
};
