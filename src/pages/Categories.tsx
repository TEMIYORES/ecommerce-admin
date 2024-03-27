import { ChangeEvent, useEffect, useRef, useState } from "react";
import Layout from "../components/Layout";
import {
  useCategoriesQuery,
  useNewCategoryMutation,
  useUpdateCategoryMutation,
} from "../features/categories/categoryApiSlice";
import { toast } from "react-toastify";
import DeleteCategory from "../components/category/DeleteCategory";

const Categories = () => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newCategory, { isLoading: savingCategory }] = useNewCategoryMutation();
  const [updateCategory, { isLoading: updatingCategory }] =
    useUpdateCategoryMutation();
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    data,
    isLoading: gettingCategories,
    isSuccess,
    isError,
    error,
    refetch: refetchCategories,
  } = useCategoriesQuery({});
  const [errMsg, setErrMsg] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const errRef = useRef<HTMLParagraphElement>(null);
  const handleDelete = (id: string | null, name: string | null) => {
    if (id && name) {
      setIsDeleting(true);
      setId(id);
      setName(name);
    }
  };
  let content;
  if (gettingCategories) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    if (data.length > 0) {
      content = (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Category Id</td>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {data?.map((category) => (
              <tr key={category?.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{category?.parentCategory?.name}</td>
                <td className="flex justify-around">
                  <button onClick={() => editCategory(category)}>
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
                    onClick={() => handleDelete(category.id, category.name)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else {
      content = (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td> Category Name</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No Category</td>
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

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };
  const handleCreate = async () => {
    try {
      // Sending data to server
      const response = await newCategory({
        name,
        parentCategory,
      }).unwrap();
      // dispatch(setAuth({ ...userData }));
      toast.success(response.message);
      //   Clear input fields
      setName("");
      refetchCategories();
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else if (err?.status === 409) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Product Failed to Add");
      }
      errRef?.current?.focus();
    }
  };
  const handleUpdate = async () => {
    try {
      // Sending data to server
      const response = await updateCategory({
        id,
        name,
        parentCategory,
      }).unwrap();
      // dispatch(setAuth({ ...userData }));
      toast.success(response.message);
      //   Clear input fields
      setName("");
      refetchCategories();
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else if (err?.status === 409) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Product Failed to Update");
      }
      errRef?.current?.focus();
    }
    setIsEditing(false);
  };
  const goBack = () => {
    setIsDeleting(false);
    setId("");
    setName("");
  };
  const editCategory = (category: any) => {
    setIsEditing(true);
    setId(category.id);
    setName(category.name);
    setParentCategory(category.parentCategory?._id || "");
  };
  return (
    <Layout>
      <h1>Catgories</h1>
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
      <label htmlFor="category_name">
        {isEditing ? `Edit Category ${name}` : "New Category Name"}
      </label>
      <form onSubmit={handleSubmit} className="flex items-center gap-1">
        <input
          className="mb-0"
          type="text"
          placeholder="Category Name"
          id="category_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="mb-0"
          value={parentCategory}
          onChange={(e) => setParentCategory(e.target.value)}
        >
          <option value={"0"}>No parent category</option>
          {data?.length > 0 &&
            data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
        </select>
        <button>Save</button>
      </form>
      {content}
      {isDeleting && (
        <DeleteCategory
          id={id}
          name={name}
          goBack={goBack}
          refreshCategories={refetchCategories}
        />
      )}
    </Layout>
  );
};

export default Categories;
