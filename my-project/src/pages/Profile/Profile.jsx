import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/authSlice";
import { useUpdateUserMutation } from "../../slices/userApiSlice";
import { toast } from "react-toastify";
import profileUpdaterImg from "../../img/update-profile.jpg";
import Footer from "../../components/Footer/Footer";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          name: name,
          email: email,
          password: password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated");
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
          <img src={profileUpdaterImg} alt="profile-img" className="w-full h-full object-cover" />
        </div>

        {/* Profile Form Section */}
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2 py-12 px-6 bg-yellow-500">
          <div className="max-w-sm w-full bg-yellow-100 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center text-black mb-6">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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
              <div className="mb-4">
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
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label className="block text-black text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full p-3 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md font-bold hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
