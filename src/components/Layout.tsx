import { ReactNode, useState } from "react";
import Navigation from "../components/Navigation";
import Logo from "./Logo";

const Layout = ({ children }: { children: ReactNode }) => {
  // const id = useSelector(selectCurrentId);
  // const { data, isLoading, isError, isSuccess, error } = useUserInfoQuery({
  //   id,
  // });
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(data);
  //   if (!isLoading && !isError) {
  //     dispatch(setUserInfo(data));
  //   }
  // }, [data]);
  const [showNav, setShowNav] = useState(false);
  return (
    <div className="w-full bg-secondaryLightGreyHex min-h-screen">
      <div className="flex items-center md:hidden p-4">
        <button className="bg-transparent p-0" onClick={() => setShowNav(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div className="flex flex-grow justify-center mr-6">
          <Logo />
        </div>
      </div>

      <div className="flex">
        <Navigation show={showNav} />
        <div className="relative text-primaryBlackHex flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
};
export default Layout;
