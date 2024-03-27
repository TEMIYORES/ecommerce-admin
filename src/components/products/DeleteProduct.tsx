import { useDeleteProductMutation } from "../../features/product/productApiSlice";
import { toast } from "react-toastify";

const DeleteProduct = ({
  id,
  name,
  goBack,
  refreshProducts,
}: {
  id: string;
  name: string;
  goBack: () => void;
  refreshProducts: () => void;
}) => {
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  console.log(id);
  const deleteProductFn = async () => {
    try {
      // Sending data to server
      const response = await deleteProduct({
        id,
      }).unwrap();
      toast.success(response.message);
      goBack();
      refreshProducts();
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        toast.error("No server response");
      } else if (err?.status === 400) {
        toast.error(err.data.message);
      } else if (err?.status === 401) {
        toast.error(err.data.message);
      } else {
        toast.error("delete Failed");
      }
      goBack();
      refreshProducts();
    }
  };
  let content;
  if (deleteLoading) {
    content = <p>Loading...</p>;
  }
  content = (
    <div className="z-10 bg-white absolute top-0 left-0 right-0 bottom-0 rounded-lg">
      <div className=" min-h-[50%] flex-grow flex justify-center items-center">
        <div className="border-2 border-primaryOrangeHex p-4 rounded-lg">
          <p>
            Do you really want to{" "}
            <span className="text-primaryRedHex uppercase font-semibold">
              delete
            </span>{" "}
            product {name}?
          </p>
          <div className="w-full flex justify-center gap-2 mt-4">
            <button className="bg-primaryRedHex" onClick={deleteProductFn}>
              Yes
            </button>
            <button onClick={goBack}>No</button>
          </div>
        </div>
      </div>
    </div>
  );

  return content;
};

export default DeleteProduct;
