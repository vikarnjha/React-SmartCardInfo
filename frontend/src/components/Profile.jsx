import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const API_URL = "https://react-smartcardinfo.onrender.com/api/auth";
  // const API_URL = "http://localhost:5000/api/auth";

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://react-smartcardinfo.onrender.com/api/auth/logout",
        null,
        {
          withCredentials: true, // Must be set to send cookies
        }
      );

      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return toast.warn("All fields are required!");
    }
    if (newPassword !== confirmNewPassword) {
      return toast.warn("Passwords do not match!");
    }
    try {
      const response = await axios.post(
        `${API_URL}/change-password`,
        {
          email: user.email,
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Password changed successfully!");
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error(response.data.message || "Failed to change password.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  };

  return (
    <>
      {/* Profile Section */}
      <div className="h-full flex justify-center items-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-96 text-center">
          {/* Profile Image */}
          <div className="relative">
            <FaUserCircle className="w-28 h-28 mx-auto rounded-full border-4 border-gray-700 shadow-lg" />
          </div>

          {user ? (
            <>
              {/* User Info */}
              <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
              <p className="text-gray-300 mt-2">{user.email}</p>
            </>
          ) : (
            <>
              {/* Optional: Placeholder or fallback */}
              <h2 className="text-2xl font-semibold mt-4">Name</h2>
              <p className="text-gray-300 mt-2">Email</p>
            </>
          )}

          {/* Change Password Section */}
          <div className="mt-6 text-left">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">
              🔒 Change Password
            </h3>

            {/* Password Fields */}
            <div className="bg-gray-800 mt-4 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>

              <div className="mb-2">
                <label className="text-sm text-gray-300">Old Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 mt-1 p-2 rounded-md text-white"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="text-sm text-gray-300">New Password</label>
                <input
                  type="password"
                  className="w-full bg-gray-700 mt-1 p-2 rounded-md text-white"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="mb-2">
                <label className="text-sm text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 mt-1 p-2 rounded-md text-white"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-5">
              <button 
              onClick={() => handleChangePassword()}
              // disabled={!newPassword || !confirmNewPassword}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105">
                Change Password
              </button>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
};

export default Profile;
