import { ChangeEvent, useEffect, useState } from "react";
import { useNewUploadMutation } from "../features/upload/uploadApiSlice";
import { toast } from "react-toastify";

const Test = () => {
  const [myFiles, setMyFiles] = useState<FlatArray<File[], 4>>();
  const [newUpload, { isLoading }] = useNewUploadMutation();
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (myFiles) {
      Object.keys(myFiles).forEach((key) => {
        formData.append(myFiles.item(key).name, myFiles.item(key));
      });
    }
    try {
      console.log(formData);
      const response = await newUpload({ formData }).unwrap();
      toast.success(response.message);
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        toast.error("No server response");
      } else if (err?.status === 400) {
        toast.error(err.data.message);
      } else if (err?.status === 401) {
        toast.error(err.data.message);
      } else if (err?.status === 422) {
        toast.error(err.data.message);
      } else if (err?.status === 413) {
        toast.error(err.data.message);
      } else {
        toast.error("upload Failed");
      }
    }
  };
  useEffect(() => {});
  return (
    <div>
      <h1>Nodejs File uploader</h1>
      <form
        id="uploadForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <input
          type="file"
          id="myFiles"
          accept="image/*"
          multiple
          onChange={(e) => setMyFiles(e.target.files)}
        />
        <button type="submit">Submit</button>
      </form>
      <h2></h2>
      <h3></h3>
    </div>
  );
};

export default Test;
