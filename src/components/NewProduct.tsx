import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "./Layout";
import { useNewProductMutation } from "../features/product/productApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ReactSortable } from "react-sortablejs";
import UploadImage from "./UploadImage";

const NewProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [newProduct, { isLoading }] = useNewProductMutation();
  const [imageUrls, setImageUrls] = useState<any>([]);

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const errRef = useRef<HTMLParagraphElement>(null);
  const [imageData, setImageData] = useState<any>([]);
  const updateImages = (newFiles: string[], myFiles: any) => {
    setImageUrls((prev: string) => [...prev, ...newFiles]);
    if (myFiles) {
      Object.keys(myFiles).forEach((key) => {
        setImageData((prev: any[]) => [...prev, myFiles.item(key)]);
      });
    }
  };
  useEffect(() => {
    console.log(imageData);
  }, [imageData]);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name.trim());
      formData.append("description", description.trim());
      formData.append("price", parseFloat(price).toString());

      imageData.forEach((data) => {
        formData.append(data.name, data);
      });

      // Sending data to server
      const response: { message: string } = await newProduct(formData).unwrap();
      toast.success(response.message);
      //   Clear input fields
      setName("");
      setDescription("");
      setPrice("");
      setImageUrls([]);
      navigate(-1);
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Product Failed to Add");
      }
      errRef?.current?.focus();
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [name, description, price]);
  const content = isLoading ? (
    <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <Layout>
      <form onSubmit={handleSubmit}>
        <h1>New Product</h1>
        <p
          ref={errRef}
          aria-live="assertive"
          className={`${
            errMsg
              ? "flex items-center gap-3 my-2 bg-primaryRedHex text-primaryWhiteHex p-space_10 rounded-radius_10 font-semibold"
              : "hidden"
          }`}
        >
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
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
          {errMsg}
        </p>
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          placeholder="Product Name"
          id="product_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
       
        <label>Photos</label>

        <div className="mb-2">
          <p>Only 4 photos can be uploaded.</p>
          <div className="flex items-center gap-2">
            {imageUrls.length > 0 ? (
              <div className="flex items-center mt-2 gap-2">
                <ReactSortable
                  className="flex items-center gap-2"
                  list={imageUrls}
                  setList={setImageUrls}
                >
                  {imageUrls?.map((image: string, index: number) => {
                    return (
                      <img
                        key={index}
                        className="w-24 h-24 border border-primaryOrangeHex object-cover rounded-lg"
                        src={image}
                        alt=""
                      />
                    );
                  })}
                </ReactSortable>
                {imageUrls?.length < 4 && (
                  <UploadImage updateImages={updateImages} />
                )}
              </div>
            ) : (
              <>
                <UploadImage updateImages={updateImages} />
                {/* <div className="flex items-center gap-5">
                  <div className="bg-primaryLightOrangeHex p-2 rounded-md">
                    No photos of this product
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
        <label htmlFor="product_desc">Product Description</label>
        <textarea
          placeholder="Description"
          id="product_desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="product_price">Product Price (in NGN)</label>
        <input
          type="number"
          placeholder="Price"
          id="product_price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button>Add Product</button>
      </form>
    </Layout>
  );
  return content;
};

export default NewProduct;
