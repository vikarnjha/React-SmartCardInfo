import { useState } from "react";
import axios from "axios";

export default function ForgotPasswordRequest({ onOtpSent }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const sendOtp = async () => {
    const res = await axios.post("/api/auth/forgot-password/request-otp", {
      email,
    });
    setMsg(res.data.message);
    onOtpSent(email);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-sm mx-auto">
      <h2 className="text-lg mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded mb-3"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={sendOtp}
        className="w-full py-2 bg-blue-600 text-white rounded"
      >
        Send OTP
      </button>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
