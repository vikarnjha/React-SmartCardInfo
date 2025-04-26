import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import signUpImage from "../assets/google_auth.svg";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";
import { useAuth } from "../context/AuthContext";

const API_URL = "https://react-smartcardinfo.onrender.com/api/auth";
// const API_URL = "http://localhost:5000/api/auth";

const Auth = () => {
  const { setUser } = useAuth();
  const [action, setAction] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password states
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href =
      "https://react-smartcardinfo.onrender.com/auth/google";
  };

  const handleForgotPassword = async () => {
    if (!email) {
      return toast.warn("Please enter your email first.");
    }

    try {
      const response = await axios.post(
        `${API_URL}/forgot-password/request-otp`,
        { email }
      );
      if (response.data.success) {
        toast.success("OTP sent to your email.");
        console.log(otpSent);
        setOtpSent(true);
        setIsForgotPassword(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleRegister = async (e) => {
    if (!name || !email || !password || !confirmPassword) {
      return toast.warn("All fields are required!");
    }
    if (password !== confirmPassword) {
      return toast.warn("Passwords do not match!");
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        { name, email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(response.data.user);
        toast.success("Sign Up Successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e) => {
    if (!email || !password) {
      return toast.error("Invalid Credentials!");
    }
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.data.success) {
        setUser(response.data.user);
        toast.success("Sign In Successful!");
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6">{action}</h2>

          {action === "Sign Up" && (
            <div className="mb-3">
              <label className="block text-gray-400 mb-1">Name</label>
              <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-gray-600">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent outline-none text-white"
                />
              </div>
            </div>
          )}

          <div className="mb-3">
            <label className="block text-gray-400 mb-1">Email</label>
            <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-gray-600">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="text"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-white"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-gray-400 mb-1">Password</label>
            <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-gray-600">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-white"
              />
              <span
                onClick={togglePassword}
                className="cursor-pointer text-gray-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {action === "Sign In" && (
            <div className="text-right text-blue-500 active:scale-95 transition-transform cursor-pointer">
              <a
                href="#"
                className="hover:text-blue-400 transition"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </a>
            </div>
          )}

          {action === "Sign Up" && (
            <div className="mb-3">
              <label className="block text-gray-400 mb-1">
                Confirm Password
              </label>
              <div className="flex items-center bg-gray-700 p-2 rounded-lg border border-gray-600">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-white"
                />
                <span
                  onClick={toggleConfirmPassword}
                  className="cursor-pointer text-gray-400"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-between gap-3">
            <button
              className="w-full py-2 mt-3 bg-blue-600 active:scale-90 active:bg-blue-700 hover:bg-blue-700 rounded-lg cursor-pointer"
              onClick={
                action === "Sign Up"
                  ? handleRegister
                  : () => setAction("Sign Up")
              }
            >
              Sign Up
            </button>
            <button
              className="w-full py-2 mt-3 bg-blue-600 active:scale-90 active:bg-blue-700 hover:bg-blue-700 rounded-lg cursor-pointer"
              onClick={
                action === "Sign In" ? handleLogin : () => setAction("Sign In")
              }
            >
              Sign In
            </button>
          </div>

          <div className="w-full flex justify-center mt-4">
            {action === "Sign In" && (
              <button>
                <img
                  src={signUpImage}
                  onClick={handleGoogleLogin}
                  alt="google-signup-btn"
                  className="cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-90 focus:outline-none"
                />
              </button>
            )}
          </div>

          {/* OTP Reset Section */}
          {isForgotPassword && (
            <div className="bg-gray-800 mt-4 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Reset Password</h3>

              <div className="mb-2">
                <label className="text-sm text-gray-300">OTP</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 mt-1 p-2 rounded-md text-white"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
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
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 mt-1 p-2 rounded-md text-white"
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>

              <button
                onClick={async () => {
                  if (!otp || !newPassword || !confirmNewPassword) {
                    toast.warn("All fields are required.");
                    return;
                  }

                  if (newPassword !== confirmNewPassword) {
                    toast.error("Passwords do not match.");
                    return;
                  }

                  try {
                    console.log(email, otp, newPassword);
                    setIsLoading(true); // Optional: add loading state if you use a spinner
                    const res = await axios.post(
                      `${API_URL}/forgot-password/reset`,
                      {
                        email,
                        otp,
                        newPassword,
                      }
                    );

                    if (res.data.success) {
                      toast.success("Password reset successful.");
                      setIsForgotPassword(false); // go back to sign-in
                      setOtpSent(false); // reset OTP state
                      setOtp(""); // clear form
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setPassword("");
                    } else {
                      toast.error(res.data.message || "Reset failed.");
                    }
                  } catch (err) {
                    toast.error(err.response?.data?.message || "Reset failed.");
                  } finally {
                    setIsLoading(false);
                  }
                }}
                className="w-full bg-green-600 hover:bg-green-700 mt-2 py-2 rounded-md"
              >
                Reset Password
              </button>
            </div>
          )}
        </div>
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
};

export default Auth;
