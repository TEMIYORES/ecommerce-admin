import { useUserInfoQuery } from "../features/users/userApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentId } from "../features/auth/authSlice";
import { setUserInfo } from "../features/users/userSlice";
import { useEffect } from "react";
import Navigation from "../components/Navigation";

const Layout = ({ children }) => {
  const id = useSelector(selectCurrentId);
  const { data, isLoading, isError, isSuccess, error } = useUserInfoQuery({
    id,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);
    if (!isLoading && !isError) {
      dispatch(setUserInfo(data));
    }
  }, [data]);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <div className="bg-primaryOrangeHex min-h-screen overflow-y-hidden flex">
        <Navigation />
        <div className="relative text-primaryBlackHex bg-white flex-grow my-2 mr-2 rounded-lg p-4">
          {children}
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
};

export default Layout;
