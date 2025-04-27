import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const API_URL = "https://react-smartcardinfo.onrender.com/api/auth";

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    async () => {
      if (!formData.subject || !formData.message) {
        return toast.warn("All fields are required!");
      }
      try {
        const response = await axios.post(`${API_URL}/contact`, {
          email: user.email,
          subject: formData.subject,
          message: formData.message,
        });
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to send message.");
      } finally {
        setFormData({ subject: "", message: "" }); // Reset form
      }
    };
  };

  return (
    <>
      <div className="flex justify-center items-center h-full bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center mb-6">📩 Contact Us</h2>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter your subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">Your Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-semibold shadow-md transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Contact;
