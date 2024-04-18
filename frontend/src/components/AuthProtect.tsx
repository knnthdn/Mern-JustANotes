import useGetUserData from "@/hooks/useGetUserData";
import logout from "@/services/logout";
import { Slice } from "@/types/sliceTypes";
import { userLogout } from "@/utils/globalSlice";
import { useQueryClient } from "@tanstack/react-query";
import { PropsWithChildren, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type AuthProtectProps = PropsWithChildren;

function AuthProtect({ children }: AuthProtectProps) {
  const { isAuth } = useSelector((state: Slice) => state.persistedReducer);
  const { data, isLoading } = useGetUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data?.status === "fail" || !isAuth) {
      navigate("../", { replace: true });
      dispatch(userLogout());
      logout();
      return queryClient.removeQueries();
    }
  }, [data, dispatch, isAuth, isLoading, navigate, queryClient]);

  return children;
}

export default AuthProtect;
