import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";


const Login = () => {
const navigate = useNavigate();
const [form, setForm] = useState({ email: "", password: "" });
const [showPassword, setShowPassword] = useState(false);
const [errors, setErrors] = useState({});

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
e.preventDefault();
if (!validate()) return;

try {
    const res = await api.post("/staff/login", {
    email: form.email,
    password: form.password
    });

    const { token, user } = res.data;

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.staff)); // ← use "staff"
    navigate("/dashboard");


} catch (err) {
    if (err.response?.status === 401) {
    setErrors({ password: "Invalid credentials" });
    } else if (err.response?.status === 422) {
    setErrors(err.response.data.errors);
    } else {
    alert("Server error. Please try again.");
    }
}
};



return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 relative">
        {/* Back Button */}
        <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-blue-900 font-semibold hover:text-blue-700 transition"
        >
        &larr; Back
        </button>

        <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center mt-4">
        Staff Login
        </h2>
        <p className="text-sky-600 mb-6 text-center">
        Sign in to your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
        <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Email</label>
            <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="staff@school.edu"
            className="w-full border border-sky-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-blue-900 mb-1">Password</label>
            <div className="relative">
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full border border-sky-200 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
            />
            <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-3 text-sky-600 text-sm font-semibold"
            >
                {showPassword ? "Hide" : "Show"}
            </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition"
        >
            Sign In
        </button>
        </form>

        <p className="text-xs text-gray-400 mt-6 text-center">
        Authorized staff only
        </p>
    </div>
    </div>
);
};

export default Login;
