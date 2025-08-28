import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import graph from '../assets/graph.png'

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/login")
  }

  return (
    <div>
      {/* home section */}
      <section className="p-30 flex flex-col md:flex-row items-center justify-around text-center bg-slate-950">
        <div>
          <h1 className="text-3xl font-medium mb-4 text-violet-900">
            Welcome to Coding Tracker Application
          </h1>
          <p className="text-6xl font-bold text-white">
            From Practice to Progress — All in One Place
          </p>
          <button className="bg-violet-900 hover:bg-violet-700  hover:scale-110 transition-transform duration-300 text-white font-bold spcae-6 m-9 p-2 px-4" onClick={handleClick}>Track Here</button>
        </div>
      </section>

      {/* Section 2 - Visual Insights */}
      <section className="p-20 bg-slate-800">
        <div className="max-w-5xl mx-auto">
          {/* Heading at the top, centered */}
          <h2 className="text-3xl font-bold text-violet-900 text-center mb-8">
            Track performance
          </h2>

          {/* Image and Content Side-by-Side */}
          <div className="flex flex-col md:flex-row items-center gap-16">
            {/* Left Side - Image */}
            <div className="flex-1">
              <img
                src={graph}
                alt="Visual Insights"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-300 text-l text-justify">
                "CodeTracker is your ultimate companion in mastering competitive programming. With seamless integration to platforms like LeetCode, Codeforces, GeeksforGeeks, CodeChef, and HackerRank, it brings all your coding stats into one powerful dashboard. Track your progress in real time, visualize your strengths and weaknesses through interactive charts, and monitor your consistency with daily streaks. Whether you’re preparing for interviews, competitive contests, or simply building your skills, CodeTracker turns your coding journey into measurable, motivating progress — all in one place."
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Section 3 - All Platforms in One Place */}
      <section className="p-16 bg-slate-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-6 text-violet-900">Core Features</h2>
        <p className="max-w-2xl mx-auto text-gray-300 mb-12">
          Connect your LeetCode, Codeforces, GFG, CodeChef, and Hackerrank profiles to track
          everything from one central dashboard.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              title: "Platform Integration",
              desc: "Easily connect all your coding profiles such as LeetCode, Codeforces, GeeksforGeeks, CodeChef, and HackerRank in one place. The system automatically fetches your performance data using APIs or scrapers. You can even link multiple accounts across platforms, making it simple to manage everything from a single dashboard.",
            },
            {
              title: "Progress Tracking",
              desc: "Get a detailed overview of your problem-solving journey. Monitor the total number of problems solved, organized by difficulty levels (easy, medium, hard). Keep track of rankings, ratings, streaks, badges, and stars from different platforms. A topic-wise breakdown helps you quickly identify your strong areas and the concepts that need more practice.",
            },
            {
              title: "Visual Analytics",
              desc: "Gain powerful insights into your growth with interactive visualizations. Track your progress using graphs for daily/weekly problem-solving, pie charts for difficulty distribution, and line charts for rating or rank changes. A calendar-style heatmap (similar to GitHub) highlights your coding streaks and consistency over time.",
            },
            {
              title: "Personalized Dashboard",
              desc: "Access all your coding activities in one centralized dashboard. Stay updated with a summary of recent submissions, upcoming contests across multiple platforms, and personalized problem suggestions based on your weak topics or difficulty level.",
            },
            {
              title: "Comparison & Benchmarks",
              desc: "Measure your progress more effectively by comparing performance across different platforms. Optionally, you can compare with friends or peers through leaderboards, making learning more engaging. Global rank percentile (if supported by the platform) is also displayed to give context to your performance.",
            },
            {
              title: "Mobile-Friendly & Responsive UI",
              desc: "Enjoy a seamless experience across all devices with a fully responsive design. Whether you’re using a laptop, tablet, or smartphone, the interface adapts perfectly to your screen size. A mobile-friendly layout ensures you can track progress, join contests, or review problems on the go without any hassle.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-slate-800 p-6 rounded-2xl shadow-md hover:shadow-blue-500/40 
                   hover:scale-105 transition-all duration-300 ease-in-out hover:text-violet-900"
            >
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-justify">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  )
}
