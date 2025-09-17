import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import defaultavatar from "../assets/defaultavatar.jpg";

const ProfileSection = () => {
    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        avatar: "",
        bio: "",
    });
    const { auth } = useContext(AuthContext);

    const getAvatar = (avatar) => (avatar?.trim() ? avatar : defaultavatar);

    // Fetch profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/users/profile", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${auth?.token}`,
                    },
                });
                console.log(res.data);
                setProfile(res.data);
                setFormData({
                    avatar: res.data.avatar || "",
                    bio: res.data.bio || "",
                });
            } catch (err) {
                console.error("Error fetching profile:", err);
            }
        };

        fetchProfile();
    }, [auth?.token]);

    // Handle bio/avatar input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save changes (only for bio + avatar)
    const handleSave = async () => {
        try {
            const res = await axios.put("http://localhost:5000/api/users/profile", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth?.token}`,
                },
            });
            setProfile(res.data);
            setIsEditing(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

    return (
        <div className="bg-gray-900 min-h-screen p-6">
            <div className="max-w-3xl mx-auto bg-gray-800 shadow-xl rounded-2xl p-8 mt-10 border border-gray-700">
                {/* Profile Header */}
                <div className="flex items-center gap-6">
                    <img
                        src={getAvatar(profile.avatar)}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-gray-600 shadow-md"
                    />
                    <div>
                        <h2 className="text-3xl font-bold text-white">{profile.username}</h2>
                        <p className="text-gray-300">{profile.email}</p>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-200 mb-2">Bio</h3>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="w-full border border-gray-600 rounded-lg p-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                            rows={4}
                            placeholder="Write something about yourself..."
                        />
                    ) : (
                        <p className="text-gray-300 bg-gray-700 p-4 rounded-lg border border-gray-600">
                            {profile.bio || "No bio added yet."}
                        </p>
                    )}
                </div>

                {/* Platforms Section */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-200 mb-3">Connected Platforms</h3>
                    {profile?.platforms && profile.platforms.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {profile.platforms.map((p, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-600 rounded-lg shadow-md border border-gray-600 hover:scale-105 transition-transform"
                                >
                                    <span className="capitalize font-medium text-white">{p.platform}</span>
                                    <span className="font-semibold text-gray-200">{p.username}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400">No platforms connected yet.</p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-violet-900 hover:bg-violet-700 hover:scale-110 transition-transform duration-300 text-white font-bold p-2 px-6 rounded-lg"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-violet-900 hover:bg-violet-700 hover:scale-110 transition-transform duration-300 text-white font-bold p-2 px-6 rounded-lg"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileSection;
