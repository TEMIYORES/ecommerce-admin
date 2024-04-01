import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectUserInfo } from "../features/users/userSlice";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const userInfo = useSelector(selectUserInfo);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { user } = useAuth0();
  console.log({ user });

  return (
    <Layout>
      <div className="text-primaryBlackHex flex justify-between items-center">
        <h2>
          Hello,{" "}
          <span className="text-primaryOrangeHex font-semibold">
            {userInfo?.name}
          </span>
        </h2>
        <div className="flex bg-gray-300 gap-1 rounded-lg overflow-hidden">
          {userInfo.picture ? (
            <div>
              <img src={userInfo?.picture || ""} alt="" className="w-8 h-8" />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          )}
          <span className="py-1 px-2 text-primaryOrangeHex font-semibold">
            {userInfo?.email}
          </span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
