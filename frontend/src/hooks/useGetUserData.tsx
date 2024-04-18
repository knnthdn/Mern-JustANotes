import getUser from "@/services/getUser";
import { useQuery } from "@tanstack/react-query";

function useGetUserData() {
  const { data, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUser,
  });

  return { data, isLoading };
}

export default useGetUserData;
