import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import loginImg from "../../img/login-img.jpg";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-black">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img src={loginImg} alt="login-img" className="w-full h-full object-cover" />
        </div>

        {/* Login Form Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 py-12 px-6 bg-yellow-500">
          <div className="max-w-sm w-full bg-yellow-100 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Log In</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Log In Now
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
