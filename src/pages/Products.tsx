import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useProductsQuery } from "../features/product/productApiSlice";
import { useState } from "react";
import DeleteProduct from "../components/products/DeleteProduct";

const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
    isSuccess,
    error,
    refetch: refetchProducts,
  } = useProductsQuery({});
  // const products = useSelector(selectProducts);
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const goBack = () => {
    setIsDeleting(false);
    setId("");
    setName("");
  };
  const handleDelete = (id: string | null, name: string | null) => {
    if (id && name) {
      setIsDeleting(true);
      setId(id);
      setName(name);
    }
  };
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  // useEffect(() => {
  //   if (!isLoading && !isError) {
  //     dispatch(setProducts(data));
  //   }
  // }, [data]);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    if (products?.length > 0) {
      content = (
        <table className="basic mt-2">
          <tr>
            <th>Product Image</th>
            {/* <th>Product Id</th> */}
            <th>Product Name</th>
            <th>Product Price</th>
            <th></th>
          </tr>
          <tbody>
            {products?.map(
              (product: {
                id: string;
                name: string;
                price: number;
                productImages: string[];
              }) => (
                <tr key={product?.id}>
                  {/* <td>
                    {product.id && product.id.length > 120
                      ? product.id?.substring(0, 120) + "..."
                      : product.id}
                  </td> */}
                  <td>
                    <div className="w-full flex justify-center">
                      {product?.productImages[0] ? (
                        <img
                          src={product?.productImages[0]}
                          alt={"product Image"}
                          className="w-20"
                        />
                      ) : null}
                    </div>
                  </td>

                  <td>{product.name}</td>
                  <td>
                    NGN{" "}
                    {product?.price?.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <div className="flex flex-wrap justify-evenly gap-1">
                      <button
                        onClick={() =>
                          handleNavigation(`/products/edit/${product.id}`)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                          />
                        </svg>
                        Edit
                      </button>
                      <button
                        className="delete"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      );
    } else {
      content = (
        <table className="basic mt-2">
          <tr>
            <th> Product Name</th>
          </tr>
          <tbody>
            <tr>
              <td>No Products</td>
            </tr>
          </tbody>
        </table>
      );
    }
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return (
    <Layout>
      <button onClick={() => handleNavigation("/products/new")}>
        Add New Product
      </button>
      {content}
      {isDeleting && (
        <DeleteProduct
          id={id}
          name={name}
          goBack={goBack}
          refreshProducts={refetchProducts}
        />
      )}
    </Layout>
  );
};

export default Products;
