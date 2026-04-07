import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MediQueueIcon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <rect width="32" height="32" rx="7" fill="#111827" />
    <rect x="6" y="10" width="8" height="12" rx="1" fill="white" />
    <rect x="16" y="6" width="10" height="16" rx="1" fill="white" />
  </svg>
);

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // ✅ validation
  const validate = () => {
    const errs = {};
    if (!email.trim()) errs.email = "Email is required";
    if (!password) errs.password = "Password is required";
    return errs;
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    setSubmitError("");

    try {
      await login({ email, password });

      // 🔥 redirect
      navigate("/dashboard");

    } catch (err) {
      setSubmitError(
        err?.response?.data?.detail || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <MediQueueIcon />
          </div>
          <h1 className="text-xl font-bold">MediQueue Admin</h1>
        </div>

        {/* 🔴 error */}
        {submitError && (
          <p className="text-red-500 text-sm mb-3">{submitError}</p>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((p) => ({ ...p, email: "" }));
            }}
            className="w-full mb-2 border p-2 rounded"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
          )}

          {/* Password */}
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((p) => ({ ...p, password: "" }));
              }}
              className="w-full mb-2 border p-2 rounded pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-2 top-2 text-sm"
            >
              {showPw ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="text-xs text-red-500">{errors.password}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded mt-3"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}