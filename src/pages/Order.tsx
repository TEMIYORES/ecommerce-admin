import { useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import DateFormat from "../components/DateFormat";
import PriceFormat from "../components/PriceFormat";
import { useOrderQuery } from "../features/order/orderApiSlice";
import { useParams } from "react-router";

const Order = () => {
  const { id } = useParams();
  const {
    data: order,
    isLoading: gettingOrder,
    isSuccess,
    isError,
    error,
  } = useOrderQuery({ id });
  console.log({ order });
  const errRef = useRef<HTMLParagraphElement>(null);
  const [errMsg, setErrMsg] = useState("");
  let content;
  if (gettingOrder) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    if (order) {
      content = (
        <div className="bg-primaryWhiteHex max-w-[600px] p-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold">Total Amount</h2>
              <h2 className="text-2xl">
                <PriceFormat price={order.totalAmount} />
              </h2>
            </div>
            {order.status ? (
              <button className="statusPaid">Paid</button>
            ) : (
              <button className="statusNotPaid">Not Paid</button>
            )}
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Reference</h2>
            <p>{order.id}</p>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">Date</h2>
            <p>
              <DateFormat dateStr={order.date} />
            </p>
          </div>
          <hr className="my-3" />
          <h2 className="font-semibold">Products</h2>
          <div>
            {order.orderData.map((product: any) => (
              <div className="flex justify-between items-center">
                <p>
                  {product.name} X {product.quantity}
                </p>
                <p>
                  <PriceFormat price={product.priceData.totalAmount} />
                </p>
              </div>
            ))}
          </div>
          <hr className="my-3" />
          <h2 className="font-semibold">Customer Information</h2>
          <div>
            <div className="flex justify-between items-center">
              <p>Name: </p>
              <p>{order.customerInformation.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Email: </p>
              <p>{order.customerInformation.email}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Address: </p>
              <p>{order.customerInformation.streetAddress}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>City: </p>
              <p>{order.customerInformation.city}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Country: </p>
              <p>{order.customerInformation.country}</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Postal Code: </p>
              <p>{order.customerInformation.postalCode}</p>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button>Download</button>
          </div>
        </div>
      );
    } else {
      content = <p>No Invoice Found.</p>;
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  useEffect(() => {
    setErrMsg("");
  }, [name]);

  return (
    <Layout>
      <h1>Order Invoice</h1>
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

export default Order;
