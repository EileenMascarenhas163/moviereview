import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import AddMovie from "./pages/Addmovie/Addmovie";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/ProtectedRoute/PrivateRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import SingleMovie from "./pages/SingleMovie/SingleMovie";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addmoview" element={<AddMovie/>}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* Protected Route using PrivateRoute */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/movie/:id" element={<SingleMovie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
