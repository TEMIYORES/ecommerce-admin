import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import { useOrdersQuery } from "../features/order/orderApiSlice";
import DateFormat from "../components/DateFormat";
import PriceFormat from "../components/PriceFormat";
import { useNavigate } from "react-router";

const Orders = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading: gettingOrders,
    isSuccess,
    isError,
    error,
  } = useOrdersQuery({});
  console.log({ data });
  const errRef = useRef<HTMLParagraphElement>(null);
  const [errMsg, setErrMsg] = useState("");
  const handleNavigation = (id: string) => {
    navigate(`/orders/${id}`);
  };
  let content;
  if (gettingOrders) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    if (data.length > 0) {
      content = (
        <table className="basic mt-2">
          <tr>
            <th className="hidden md:table-cell">Order Id</th>
            <th>Products</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
          <tbody>
            {data?.map((order: any) => (
              <tr
                key={order?.id}
                className="tableRowHover"
                onClick={() => handleNavigation(order.id)}
              >
                <td className="hidden md:table-cell">{order.id}</td>
                <td className="text-left">{order?.orderData.join(", ")}</td>
                <td className="text-left">
                  <PriceFormat price={order.totalAmount} />
                </td>
                <td>{<DateFormat dateStr={order.date} />}</td>
                <td className="">
                  {order.status ? (
                    <button className="statusPaid">Paid</button>
                  ) : (
                    <button className="statusNotPaid">Not Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      content = (
        <table className="basic mt-2">
          <tr>
            <th> Order Name</th>
          </tr>
          <tbody>
            <tr>
              <td>No Order</td>
            </tr>
          </tbody>
        </table>
      );
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  useEffect(() => {
    setErrMsg("");
  }, [name]);

  return (
    <Layout>
      <h1>Orders</h1>
      <p
        ref={errRef}
        aria-live="assertive"
        className={`${
          errMsg
            ? "bg-rose-500 p-space_10 rounded-radius_10 font-semibold"
            : "hidden"
        }`}
      >
        {errMsg}
      </p>
      {content}
    </Layout>
  );
};

export default Orders;
