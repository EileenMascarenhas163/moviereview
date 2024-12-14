import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../slices/userApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { toast } from "react-toastify";
import registerImg from "../../img/register-img.jpg";
import Footer from "../../components/Footer/Footer";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <div className="flex min-h-screen bg-black">
        {/* Left Image Section */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={registerImg}
            alt="register-img"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Register Form Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 py-12 px-6 bg-yellow-500">
          <div className="max-w-sm w-full bg-yellow-100 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Register</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <div className="flex items-center border border-black rounded-md">
                  <i className="fa fa-user text-black p-3"></i>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 text-black bg-transparent outline-none"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center border border-black rounded-md">
                  <i className="fa fa-envelope text-black p-3"></i>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 text-black bg-transparent outline-none"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <div className="flex items-center border border-black rounded-md">
                  <i className="fa fa-lock text-black p-3"></i>
                  <input
                    type="password"
                    id="password"
                    className="w-full p-3 text-black bg-transparent outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="flex items-center border border-black rounded-md">
                  <i className="fa fa-lock text-black p-3"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-3 text-black bg-transparent outline-none"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
