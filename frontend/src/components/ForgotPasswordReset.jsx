import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordReset({ email }) {
  const [otp, setOtp] = useState("");
  const [pass, setPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const reset = async () => {
    if (pass !== confirm) {
      setMsg("Passwords do not match.");
      return;
    }
    try {
      const res = await axios.post("/api/auth/forgot-password/reset", {
        email,
        otp,
        newPassword: pass,
      });
      setMsg(res.data.message);
    } catch (e) {
      setMsg(e.response?.data?.error || "Reset failed.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-sm mx-auto">
      <h2 className="text-lg mb-4">Reset Password</h2>
      <input
        type="text"
        placeholder="OTP"
        className="w-full p-2 border rounded mb-2"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        className="w-full p-2 border rounded mb-2"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="w-full p-2 border rounded mb-4"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
      />
      <button
        onClick={reset}
        className="w-full py-2 bg-green-600 text-white rounded"
      >
        Reset Password
      </button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
