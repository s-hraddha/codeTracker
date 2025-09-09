import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function AddPlatform({ closeModal, onSuccess }) {
    const [platforms, setPlatforms] = useState([{ platform: "", username: "" }]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const { auth } = useContext(AuthContext);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPlatforms = [...platforms];
        updatedPlatforms[index][name] = value;
        setPlatforms(updatedPlatforms);
    };

    const handleAddMore = () => {
        setPlatforms([...platforms, { platform: "", username: "" }]);
    };

    const handleRemove = (index) => {
        const updatedPlatforms = platforms.filter((_, i) => i !== index);
        setPlatforms(updatedPlatforms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            await axios.post("http://localhost:5000/api/platforms/submitall",
                { platforms },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token}`
                    },
                }
            );

            setMessage("platforms saved successfully");
            setPlatforms([{ platform: "", username: "" }]);

            if(typeof onSuccess === "function"){
                onSuccess();
            }

            if (typeof closeModal === "function") {
                closeModal();
            }
        } catch (error) {
            console.error(error);
            setMessage("Error")

        }finally{
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Add Coding Platforms</h2>

            {message && (
                <p className="mb-3 text-center font-medium text-blue-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {platforms.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-3 w-full border p-3 rounded-lg bg-slate-900"
                    >
                        {/* Platform Dropdown */}
                        <select
                            name="platform"
                            value={item.platform}
                            onChange={(e) => handleChange(index, e)}
                            className="p-2 rounded-md bg-gray-800 text-white w-1/4 focus:outline-none focus:ring-2 focus:ring-violet-500"

                            required
                        >
                            <option value="">Select Platform</option>
                            <option value="leetcode">LeetCode</option>
                            <option value="codeforces">Codeforces</option>
                            <option value="geeksforgeeks">GeeksforGeeks</option>
                            <option value="codechef">CodeChef</option>
                        </select>

                        {/* Username Input */}
                        <input
                            type="text"
                            name="username"
                            value={item.username}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter username"
                            className="p-2 rounded-md bg-gray-800 text-white flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
                            required
                        />

                        {/* Remove Button */}
                        {platforms.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="p-2 text-red-400 hover:text-red-600"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

                <div className="flex gap-4">
                    <button
                        type="button"
                        onClick={handleAddMore}
                        className="mt-6 px-6 py-2 bg-violet-900 rounded-lg hover:bg-violet-700 transition text-white"
                    >
                        + Add More
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 px-6 py-2 bg-violet-900 rounded-lg hover:bg-violet-700 transition text-white"
                    >
                       {loading? "saving..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

