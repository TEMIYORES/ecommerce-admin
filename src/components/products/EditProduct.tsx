import { useParams } from "react-router";
import { useProductQuery } from "../../features/product/productApiSlice";
import Layout from "../Layout";
import EditForm from "./EditForm";

const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess, error } = useProductQuery({
    id,
  });
  console.log({ data });
  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = (
      <>
        <EditForm
          id={id}
          name={data?.name}
          description={data?.description}
          price={data?.price.toString()}
          productImages={data?.productImages}
          category={data?.category}
        />
      </>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return <Layout>{content}</Layout>;
};

export default EditProduct;
