import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

function useAxios() {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
}

const useFetchData = (
  url: string,
  token: boolean = false,
  options?: UseQueryOptions<any, unknown, any, any>,
): UseQueryResult<any, unknown> => {
  const axiosInstance = useAxios();

  const fetchData = async () => {
    const headers: Record<string, string> = {};

    if (token) {
      const freshToken = localStorage.getItem("token");
      if (freshToken) {
        headers["Authorization"] = `Bearer ${freshToken}`;
      }
    }

    const response = await axiosInstance.get(url, { headers });
    return response.data;
  };

  return useQuery({
    queryKey: [url],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    refetchInterval: false,
    ...options,
  });
};

export default useFetchData;
