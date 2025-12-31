import { useState, useEffect } from "react";
import { Eye, EyeOff, Mail, User, Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import api from "../configs/api";
import { login as loginAction } from "../app/features/authSlice";
import toast from "react-hot-toast";

const AuthForm = () => {
  const dispatch = useDispatch();

  const query = new URLSearchParams(window.location.search);
  const initialMode = query.get("state") === "register" ? "register" : "login";

  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Reset irrelevant fields when mode changes
  useEffect(() => {
    if (mode === "login") {
      setFormData((prev) => ({ ...prev, name: "" }));
    }
  }, [mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload =
        mode === "login"
          ? { email: formData.email, password: formData.password }
          : formData;

      const { data } = await api.post(`/api/users/${mode}`, payload);

      dispatch(loginAction(data));
      localStorage.setItem("token", data.token);

      toast.success(data.message || "Authentication successful");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center capitalize">
          {mode}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "register" && (
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#432DD7]"
                required
              />
            </div>
          )}

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#432DD7]"
              required
            />
          </div>

          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-[#432DD7]"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#432DD7] text-white font-medium rounded-lg disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          {mode === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="ml-1 text-[#432DD7] font-semibold hover:underline"
          >
            {mode === "login" ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
