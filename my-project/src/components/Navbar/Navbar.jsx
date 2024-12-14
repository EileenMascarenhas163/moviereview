import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { logout } from "../../slices/authSlice";
import { Link } from "react-router-dom";
import profilePic from "../../img/profile.png";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogOut = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black text-yellow-500 flex justify-between items-center p-5 shadow-lg">
      <Link className="text-2xl font-bold hover:text-yellow-300" to="/">
        REVIEWiT
      </Link>

      <ul className="flex space-x-6">
        <li>
          <Link className="hover:text-yellow-300" to="/">
            HOME
          </Link>
        </li>
        <li>
          <Link className="hover:text-yellow-300" to="/addmoview">
            ADDMOVIE
          </Link>
        </li>
        {userInfo ? (
          <>
            <li>
              <button
                onClick={handleLogOut}
                className="hover:text-yellow-300"
              >
                LOGOUT
              </button>
            </li>
            <li>
              <Link to="/profile">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-yellow-500"
                />
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="hover:text-yellow-300" to="/login">
                LOGIN
              </Link>
            </li>
            <li>
              <Link className="hover:text-yellow-300" to="/register">
                REGISTER
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
