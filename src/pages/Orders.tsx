import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import { selectUserInfo } from "../features/users/userSlice";

const Orders = () => {
  const userInfo = useSelector(selectUserInfo);

  return <Layout>Welcome orders {userInfo?.email}</Layout>;
};

export default Orders;
