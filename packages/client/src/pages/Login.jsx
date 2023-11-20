import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth.jsx";

import Input from "../components/custom/Input.jsx";

import { isValidBool, isValid } from "../utils/support.js";

const Login = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  useEffect(() => {
    if (auth?.email) navigate("/", { replace: true });
  }, [auth]);

  const handleChange = (event) =>
    setData((prev) => ({ ...prev, [event.target.id]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = {
      email: !isValidBool(data.email),
      password: !isValidBool(data.password),
    };

    if (Object.values(newErrors).reduce((prev, curr) => prev || curr, false)) {
      toast.error("Both fields are required!");
      return setErrors({ ...newErrors });
    }

    if (isValid("Email", data.email, "email") !== "") {
      toast.error("Email is invalid!");
      newErrors.email = true;
      return setErrors({ ...newErrors });
    }

    if (
      data.email.trim().toLowerCase() !== "demo@formbuilder.com" ||
      data?.password?.trim() !== "Demo@123"
    ) {
      toast.error("Invalid credentials");
      return setErrors({ email: true, password: false });
    }

    setAuth({ ...data });
  };

  return (
    <div className="min-h-screen bg-neutral-100 py-14 md:px-14 grid place-items-center">
      <div className="flex w-full">
        <div className="w-1/2 hidden md:block">
          <div className="w-4/5 mx-auto p-7 text-lg">
            <div className="text-4xl font-bold">Form Builder</div>

            <div className="font-bold mt-3">Build your form today!</div>

            <div>
              <div className="font-bold mt-5">Question types:</div>

              <ul className="ms-5 mt-3 list-disc">
                <li>Categorize</li>
                <li>Cloze</li>
                <li>Comprehension</li>
              </ul>
            </div>

            <div className="mt-5">
              <p className="font-bold">Demo account credentials</p>
              <p>Email : demo@formbuilder.com</p>
              <p>Password : Demo@123</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <div className="w-4/5 mx-auto bg-neutral-200 rounded-xl p-7">
            <div className="text-2xl font-bold">Welcome back</div>
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <Input
                  id="email"
                  label="Email"
                  placeholder="Enter your email"
                  size="lg"
                  value={data.email}
                  onChange={handleChange}
                  isInvalid={errors.email}
                  mandatory={true}
                />
              </div>
              <div className="mt-5">
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  size="lg"
                  value={data.password}
                  onChange={handleChange}
                  isInvalid={errors.password}
                  mandatory={true}
                />
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className="w-full rounded-md bg-neutral-900 hover:bg-neutral-950 disabled:bg-neutral-700 text-white py-2 px-2"
                >
                  Sign in to your account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
