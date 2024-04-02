import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-max-[600px] min-h-[400px] flex-col gap-5 border-2 place-items-center justify-center border-white rounded-lg p-5">
        <h2 className="font-semibold text-5xl">You Are Not An Admin</h2>
        <span>
          <Link to={"/login"} replace={true} className="underline">
            Go back to Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Unauthorized;
