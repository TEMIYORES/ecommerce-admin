import { ChangeEvent, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { useRegisterMutation } from "./authApiSlice";
import { toast } from "react-toastify";

// const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const NAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,23}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;

const Register = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);
  const [register, { isLoading }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);

  const [name, setName] = useState("");
  const [isValidName, setIsValidName] = useState(false);
  const [isNameFocus, setIsNameFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [isValidMatchPassword, setIsValidMatchPassword] = useState(false);
  const [isMatchPasswordFocus, setIsMatchPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if button with enabled with JS Hack
    const v1 = NAME_REGEX.test(name);
    const v2 = PASSWORD_REGEX.test(password);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const formData = {
        name,
        email,
        password,
      };
      //   formData.append("email", email);
      //   formData.append("name", name);
      //   formData.append("password", password);
      // Sending data to server
      const response = await register(formData).unwrap();
      setEmail("");
      setName("");
      setPassword("");
      toast.success(response.message);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
      //   Clear input fields
    } catch (err: any) {
      console.log(err);
      if (!err?.data) {
        setErrMsg("No server response");
      } else if (
        err?.status === 400 ||
        err?.status === 401 ||
        err?.status === 409
      ) {
        setErrMsg(err.data.message);
      } else {
        setErrMsg("Register Failed");
      }
      errRef?.current?.focus();
    }
  };

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setIsValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NAME_REGEX.test(name);
    console.log(result);
    console.log(name);
    setIsValidName(result);
  }, [name]);

  useEffect(() => {
    const result = PASSWORD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setIsValidPassword(result);
    if (password !== "" && matchPassword !== "") {
      const match = password === matchPassword;
      setIsValidMatchPassword(match);
    }
  }, [password, matchPassword]);

  useEffect(() => {
    setErrMsg("");
  }, [email, name, password, matchPassword]);

  return (
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
        <h2 className="font-bold text-size_30">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="email"
              className="font-semibold flex gap-2 items-center"
            >
              Email:
              <span className={isValidEmail ? "" : "hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryOrangeHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
              <span className={isValidEmail || !email ? "hidden" : ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryRedHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </label>
            <input
              id="email"
              name="email"
              required
              ref={emailRef}
              aria-invalid={isValidEmail ? "false" : "true"}
              aria-describedby="uidnote"
              autoComplete="off"
              type="text"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsEmailFocus(true)}
              onBlur={() => setIsEmailFocus(false)}
            />
            <p
              id="uidnote"
              className={
                isEmailFocus && email && !isValidEmail
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              Enter A Valid Email Address.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="username"
              className="font-semibold flex gap-2 items-center"
            >
              Name:
              <span className={isValidName ? "" : "hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryOrangeHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
              <span className={isValidName || !name ? "hidden" : ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryRedHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </label>
            <input
              id="username"
              name="username"
              required
              aria-invalid={isValidName ? "false" : "true"}
              aria-describedby="uidnote"
              autoComplete="off"
              type="text"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsNameFocus(true)}
              onBlur={() => setIsNameFocus(false)}
            />
            <p
              id="uidnote"
              className={
                isNameFocus && name && !isValidName
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>
              4 to 24 Characters.
              <br />
              No Number and Special Characters are allowed.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="password"
              className="font-semibold flex gap-2 items-center"
            >
              Password:
              <span className={isValidPassword ? "" : "hidden"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryOrangeHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
              <span className={isValidPassword || !password ? "hidden" : ""}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryRedHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </label>
            <input
              id="password"
              name="password"
              required
              aria-invalid={isValidPassword ? "false" : "true"}
              aria-describedby="passwordnote"
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsPasswordFocus(true)}
              onBlur={() => setIsPasswordFocus(false)}
            />
            <p
              id="passwordnote"
              className={
                isPasswordFocus && !isValidPassword
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>{" "}
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-size_18">
            <label
              htmlFor="match_password"
              className="font-semibold flex gap-2 items-center"
            >
              Confirm Password:
              <span
                className={
                  isValidMatchPassword && isValidPassword ? "" : "hidden"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryOrangeHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </span>
              <span
                className={
                  isValidMatchPassword || !matchPassword ? "hidden" : ""
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primaryRedHex"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </label>
            <input
              id="match_password"
              name="match_password"
              required
              aria-invalid={isValidMatchPassword ? "false" : "true"}
              aria-describedby="matchpasswordnote"
              type="password"
              className="border-2 border-primaryWhiteHex rounded-md p-2"
              value={matchPassword}
              onChange={(e) => setMatchPassword(e.target.value)}
              onFocus={() => setIsMatchPasswordFocus(true)}
              onBlur={() => setIsMatchPasswordFocus(false)}
            />
            <p
              id="matchpasswordnote"
              className={
                isMatchPasswordFocus && !isValidMatchPassword
                  ? "relative bottom-[-10px] bg-primaryGreyHex text-primaryWhiteHex rounded-radius_10 p-space_10"
                  : "hidden"
              }
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
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              </svg>{" "}
              Must match the first password input field.
            </p>
          </div>
          <button
            disabled={
              !isValidName || !isValidPassword || !isValidMatchPassword
                ? true
                : false
            }
            className="border-2 border-[#242424] bg-primaryBlackHex text-primaryWhiteHex rounded-md p-2 disabled:bg-primaryGreyHex disabled:text-primaryBlackHex"
          >
            {isLoading ? <Spinner /> : "Sign Up"}
          </button>
        </form>
        <div>
          Already registered?{" "}
          <Link to={"/login"} className="underline">
            Log In
          </Link>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Register;
