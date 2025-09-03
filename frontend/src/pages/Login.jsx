import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5000/api/users/login", formData);
            
            console.log("Login Response:", res.data);

            const userData = {
                token: res.data.token,
                username: res.data.user.username, 
                email: res.data.user.email,       
                id: res.data.user.id   
            }
            login(userData);

            setMessage(res.data.message );
            navigate('/dashboard')
        } catch (err) {
            setMessage(err.response?.data?.message || "Login failed");
            console.log(err);
        }finally{
            setLoading(false);
        }
    };
    return (
        <div className='flex justify-center items-center min-h-screen bg-gray-900'>
            <div className='bg-gray-800 p-16 shadow-xl/20 shadow-violet-500 ring-2 ring-violet-500/50 rounded-2xl'>
                <h2 className='text-2xl font-bold text-center text-white mb-6 p-6'>Login</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required />
                    <input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
                        required />

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-violet-900 hover:bg-violet-700 hover:scale-110 transition-transform duration-300 text-white font-bold p-2 px-6 rounded-lg"
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-gray-300 text-sm mt-4 text-center">
                        New Registration?{" "}
                        <Link to="/register" className="text-violet-400 hover:underline ">
                            Register
                        </Link>
                    </p>
                </form>
                {message && <p className="text-center text-gray-300 mt-4">{message}</p>}
            </div>
        </div>
    );
}