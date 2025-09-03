import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Password do not match");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post("http://localhost:5000/api/users/register", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
            if (res.data.token) {
                setMessage(res.data.message)
                navigate("/login")
            }
        } catch (error) {
            setError(error.response?.data?.message || "something went Wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-16 rounded-2xl shadow-xl/20 shadow-violet-500 ring-2 ring-violet-500/50">
                <h2 className="text-2xl font-bold text-center text-white mb-6 p-6">
                    Register
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required
                    />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-violet-900 hover:bg-violet-700 hover:scale-110 transition-transform duration-300 text-white font-bold p-2 px-6 rounded-lg"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="text-gray-300 text-sm mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-violet-400 hover:underline ">
                        Login
                    </Link>
                </p>
                {error && <p className="text-center text-red-400 mt-4">{error}</p>}
                {message && <p className="text-center text-gray-300 mt-4">{message}</p>}
            </div>
        </div>
    );
}

export default Register;
