import { useEffect } from "react";
import { Outlet } from "react-router";
import useLocalStorage from "../../hooks/useLocalStorage";
import { selectCurrentToken } from "./authSlice";
import { useSelector } from "react-redux";
import { useRefreshQuery } from "../refresh/refreshApiSlice";

const PersistLogin = () => {
  const { isLoading } = useRefreshQuery();
  const accessToken = useSelector(selectCurrentToken);
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    console.log("loading", isLoading);
  }, [accessToken, isLoading]);
  return (
    <>
      {!JSON.parse(persist) ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading</p>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
