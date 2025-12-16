import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/auth.api";
import { saveAuth } from "../utils/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await loginApi(form);
      saveAuth(res.data);
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

         <p className="text-gray-700 text-center mt-6">
            New to our community?{" "}
            <Link
              to="/signup"
              className="text-primary hover:text-secondary font-semibold underline"
            >
              Sign up
            </Link>
          </p>
      </form>
    </div>
  );
};

export default Login;
