import { useState } from "react";

export default function AddPlatfrom() {
    const [platforms, setPlatforms] = useState([{ platform: "", username: "" }]);
    const [message, setMessage] = useState("");

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
        const updatedPlatforms = platforms.filter((_, i) => i == index);
        setPlatforms(updatedPlatforms);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await axios.post("http://localhost:5000/api/platforms/submit",
                {
                    platforms
                },
                {
                    withCredentials: true
                }
            );
            setMessage("platforms saved successfully");
            setPlatforms([{ platform: "", username: "" }]);
        } catch (err) {
            console.log(err);
            setMessage("Error");
        }
    };
    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h2 className="text-2xl font-semibold mb-4">Add Coding Platforms</h2>

            {message && (
                <p className="mb-3 text-center font-medium text-blue-600">{message}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                {platforms.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center border p-3 rounded-lg"
                    >
                        {/* Platform Dropdown */}
                        <select
                            name="platform"
                            value={item.platform}
                            onChange={(e) => handleChange(index, e)}
                            className="border p-2 rounded-md"
                            required
                        >
                            <option value="">Select Platform</option>
                            <option value="leetcode">LeetCode</option>
                            <option value="codeforces">Codeforces</option>
                            <option value="gfg">GeeksforGeeks</option>
                            <option value="codechef">CodeChef</option>
                            <option value="hackerrank">HackerRank</option>
                        </select>

                        {/* Username Input */}
                        <input
                            type="text"
                            name="username"
                            value={item.username}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Enter username"
                            className="border p-2 rounded-md"
                            required
                        />

                        {/* Remove Button */}
                        {platforms.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md"
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
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        + Add More
                    </button>

                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>

    );
}   