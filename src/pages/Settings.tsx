import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectUserInfo } from "../features/users/userSlice";

const Settings = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <Layout>
      <div>Hello, {userInfo?.email}</div>
    </Layout>
  );
};

export default Settings;
