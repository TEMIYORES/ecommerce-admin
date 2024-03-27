import { Link } from "react-router-dom";

const NotFound = () => {  
  return (
    <div className="flex w-[100vw] h-[100vh] place-items-center justify-center">
        <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 place-items-center justify-center border-white rounded-lg p-5" >
        <h2 className="font-semibold text-5xl">404 Not Found</h2><span><Link to={"/"} className="underline">Go back to Login</Link></span>
    </div>
    </div>
  )
}

export default NotFound;