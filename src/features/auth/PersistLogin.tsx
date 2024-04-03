import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";
import { useRefreshQuery } from "../refresh/refreshApiSlice";

const PersistLogin = () => {
  const { isLoading, isSuccess } = useRefreshQuery({});
  const accessToken = useSelector(selectCurrentToken);
  const [persist] = useLocalStorage("persist", false);

  const pathname = location?.pathname;
  useEffect(() => {
    console.log("loading", isLoading);
  }, [accessToken, isLoading]);
  return (
    <>
      {!JSON.parse(persist) ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading</p>
      ) : isSuccess ? (
        <Outlet />
      ) : (
        <Navigate to={"/login"} state={{ from: pathname }} />
      )}
    </>
  );
};

export default PersistLogin;
