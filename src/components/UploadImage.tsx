import { ChangeEvent } from "react";
// import { useNewUploadMutation } from "../features/upload/uploadApiSlice";
// import { toast } from "react-toastify";
// import Spinner from "./Spinner";

const UploadImage = ({
  updateImages,
}: {
  updateImages: (files: string[], myFiles: any) => void;
}) => {
  // const [newUpload, { isLoading }] = useNewUploadMutation();
  const handleSubmit = async (
    e: ChangeEvent<HTMLInputElement>,
    myFiles: any
  ) => {
    e.preventDefault();
    const formData = new FormData();
    const files: string[] = [];
    console.log({ myFiles });
    if (myFiles) {
      Object.keys(myFiles).forEach((key) => {
        formData.append(myFiles.item(key).name, myFiles.item(key));
        files.push(URL.createObjectURL(myFiles.item(key)));
      });
      updateImages(files, myFiles);
      // try {
      // const response = await newUpload({ id, formData }).unwrap();
      // toast.success(response.message);
      // } catch (err: any) {
      //   if (!err?.data) {
      //     console.log(err);
      //     toast.error("No server response");
      //   } else if (
      //     err?.status === 400 ||
      //     err?.status === 401 ||
      //     err?.status === 422 ||
      //     err?.status === 413
      //   ) {
      //     toast.error(err.data.message);
      //   } else {
      //     toast.error("Upload Failed");
      //   }
      // }
    }
  };

  return (
    <div className="flex items-start gap-5">
      <label className="bg-primaryLightOrangeHex text-primaryBlackHex rounded-lg w-24 h-24 border flex items-center justify-center gap-2 flex-col relative">
        <>
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
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="font-light text-sm">Upload</p>
          <input
            type="file"
            id="myFiles"
            accept="image/*"
            multiple
            onChange={(e) => handleSubmit(e, e.target.files)}
            className="hidden"
          />
        </>
      </label>
    </div>
  );
};

export default UploadImage;
