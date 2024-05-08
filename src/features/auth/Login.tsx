import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setAuth } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useAuth0 } from "@auth0/auth0-react";
import useToggle from "../../hooks/useToggle";

const Login = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from;
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [email, setEmail] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const [check, toggleCheck] = useToggle("persist", false);
  useEffect(() => {
    userRef?.current?.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  useEffect(() => {
    // const result = USER_REGEX.test(email);
    if (email.trim() !== "" && !(email.length < 4)) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  }, [email]);

  useEffect(() => {
    if (password.trim() !== "" && !(password.length < 6)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [password]);

  const handle0AuthLogin = async (
    user_email: string | undefined,
    isAuthenticated: boolean
  ) => {
    try {
      // Sending data to server
      const userData = await login({
        email: user_email,
        isAuthenticated,
        picture: user?.picture,
      }).unwrap();
      dispatch(setAuth({ ...userData }));
      console.log({ userData });
      setEmail("");
      setPassword("");
      toast.success("Login Successful");
      console.log({ from });
      navigate(from || "/", { replace: true });
      //   Clear input fields
    } catch (err: any) {
      console.log(err);
      if (!err?.data) {
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
      setTimeout(() => {
        if (isAuthenticated) {
          logout();
        }
      }, 3000);
    }
  };
  useEffect(() => {
    if (isAuthenticated) {
      // Call your function here after successful login
      handle0AuthLogin(user?.email, isAuthenticated);
    }
  }, [isAuthenticated]);
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Sending data to server
      const userData = await login({
        email: email,
        password,
        isAuthenticated,
      }).unwrap();
      dispatch(setAuth({ ...userData }));
      console.log({ userData });
      setEmail("");
      setPassword("");
      toast.success("Login Successful");
      console.log({ from });
      navigate(from || "/", { replace: true });
      //   Clear input fields
    } catch (err: any) {
      if (!err?.data) {
        console.log(err);
        setErrMsg("No server response");
      } else if (err?.status === 400) {
        setErrMsg(err.data.message);
      } else if (err?.status === 401) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      errRef?.current?.focus();
    }
  };

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const content = isLoading ? (
    <h1>Loading</h1>
  ) : (
    <section className="flex w-[100vw] h-[100vh] place-items-center justify-center">
      <div className="flex w-[500px] min-h-[400px] flex-col gap-5 border-2 border-white rounded-lg p-5">
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
        <h2 className="font-bold text-size_30">Log In</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="email"
              className="font-semibold flex gap-2 items-center"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              ref={userRef}
              required
              autoComplete="off"
              type="text"
              className="p-2"
              value={email}
              onChange={handleUserInput}
            />
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="password"
              className="font-semibold flex gap-2 items-center"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={password}
              onChange={handlePasswordInput}
            />
          </div>
          <button
            disabled={!isValidName || !isValidPassword ? true : false}
            className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
          >
            {isLoading ? "loading..." : "Sign In"}
          </button>
          <div> OR </div>
          {!isAuthenticated && (
            <button
              className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
              onClick={() => loginWithRedirect()}
            >
              Sign In with Auth0
            </button>
          )}

          <div className="w-full gap-2 flex justify-start items-center">
            <input
              type="checkbox"
              id="persist"
              className="w-fit m-0"
              onChange={toggleCheck}
              checked={check}
            />
            <label htmlFor="persist" className="m-0">
              Trust This Device?
            </label>
          </div>
        </form>
        <div>
          Need an Account?{" "}
          <Link to={"/register"} className="underline">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
  return content;
};

export default Login;
