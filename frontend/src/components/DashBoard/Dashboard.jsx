import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ReactTyped } from "react-typed";
import bgImage from "../../assets/bg.jpg";
import StatsCard from "./StatsCard";
import PlatformCard from "./PlatformCard";
import axios from 'axios';
import AddPlatform from "./AddPlatform";

export default function Dashboard() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const [platforms, setPlatforms] = useState([]);
    const [loading, setLoading] = useState(true);

    const isAddPlatformRoute = location.pathname === "/dashboard/addPlatform";

    const fetchPlatforms = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:5000/api/platforms/get", {
                headers: { Authorization: `Bearer ${auth.token}` },
            });
            const data = res.data;
            const platformArray = Object.keys(data).filter((key) => !["_id", "userId", "__v", "createdAt", "updatedAt"].includes(key)).map((key) => ({ platform: key, data: data[key] }));

            setPlatforms(platformArray);
        } catch (error) {
            console.error("Error fetching PLtforms: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlatforms();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section
                className="relative flex flex-col items-center justify-center text-center bg-cover bg-center h-screen"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 flex flex-col items-center space-y-6">
                    <h1 className="text-3xl text-white font-bold">
                        <ReactTyped
                            strings={[
                                `Welcome, ${auth.user.username || "Guest"}`,
                                "Stay Ahead ! — Track, Analyze & Improve Your Coding Skills!",
                                "Add your favorite platforms",
                            ]}
                            typeSpeed={90}
                            backSpeed={90}
                            backDelay={1500}
                            loop
                            showCursor={false}
                        />
                    </h1>

                    <button
                        onClick={() => navigate("/dashboard/addPlatform")}
                        className="mt-6 px-6 py-2 bg-violet-900 rounded-lg hover:bg-violet-700 transition text-white"
                    >
                        Add Platform
                    </button>
                </div>
            </section>

            {/* Main outlet & dashboard content */}
            {!isAddPlatformRoute && (
                <div className="w-full p-6 bg-slate-800 min-h-[50vh]">
                    {loading ? (
                        <p className="text-white text-center">Loading your platforms...</p>
                    ) : platforms.length === 0 ? (
                        <p className="text-white text-center">No platforms added yet.</p>
                    ) : (
                        <>
                            {/* Stats Cards */}
                            <StatsCard platforms={platforms} />

                            {/* Platform Cards */}
                            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
                                {platforms.map((platform) => (
                                    <PlatformCard key={platform.platform} data={platform} />
                                ))}
                            </div>
                        </>
                    )}
                    {/* <Outlet context={{refreshPlatforms: fetchPlatforms}} /> Other nested dashboard routes */}
                </div>
            )}

            {/* Modal (only for addPlatform route) */}
            {isAddPlatformRoute && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-2xl p-6 relative">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
                        >
                            ✖
                        </button>
                        {/* <Outlet context={{refreshPlatforms: fetchPlatforms}} /> AddPlatform goes here */}
                        <AddPlatform closeModal={() => navigate("/dashboard")} onSuccess={fetchPlatforms} />
                    </div>
                </div>
            )}
        </div>
    );
}
