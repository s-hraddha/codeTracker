import React from "react";
import leetcodelogo from "../../assets/Platforms/leetcodelogo.png";
import codecheflogo from "../../assets/Platforms/codecheflogo.jpg";
import codeforceslogo from "../../assets/Platforms/codeforceslogo.jpg";
import gfglogo from "../../assets/Platforms/gfglogo.png";

const platformLogos = {
    leetcode: leetcodelogo,
    codechef: codecheflogo,
    codeforces: codeforceslogo,
    geeksforgeeks: gfglogo,
};

const platformColors = {
    leetcode: "from-yellow-600 to-yellow-400 border-yellow-400",
    codechef: "from-purple-700 to-purple-500 border-purple-400",
    codeforces: "from-blue-700 to-blue-500 border-blue-400",
    geeksforgeeks: "from-green-700 to-green-500 border-green-400",
};

export default function PlatformCard({ data }) {
    const { platform, data: details } = data;
    const cardStyle = platformColors[platform] || "from-gray-700 to-gray-500 border-gray-400";

    return (
        <div className={`p-6 rounded-xl border shadow-lg bg-gradient-to-br ${cardStyle} text-white hover:scale-105 transition`}>
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <img src={platformLogos[platform]} alt={platform} className="w-10 h-10 rounded-full" />
                <h2 className="text-xl font-bold capitalize">{platform}</h2>
            </div>

            {/* LeetCode */}
            {platform === "leetcode" && details.submitStats && (
                <>
                    <p><span className="font-semibold">Username:</span> {details.username}</p>
                    <p><span className="font-semibold">Ranking:</span> {details.profile?.ranking}</p>
                    <p className="mt-2 font-semibold">Problems Solved:</p>
                    <ul className="list-disc list-inside">
                        {details.submitStats.acSubmissionNum.map((stat) => (
                            <li key={stat.difficulty}>
                                {stat.difficulty}: {stat.count}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {/* CodeChef */}
            {platform === "codechef" && (
                <>
                    <p><span className="font-semibold">Username:</span> {details.username}</p>
                    <p><span className="font-semibold">Current Rating:</span> {details.currentRating}</p>
                    <p><span className="font-semibold">Stars:</span> {details.stars}</p>
                    <p><span className="font-semibold">Solved:</span> {details.totalProblemsSolved}</p>
                </>
            )}

            {/* Codeforces */}
            {platform === "codeforces" && (
                <>
                    <p><span className="font-semibold">Handle:</span> {details.handle}</p>
                    <p><span className="font-semibold">Rank:</span> {details.rank}</p>
                    <p><span className="font-semibold">Problems Solved:</span> {details.totalProblemsSolved}</p>
                </>
            )}

            {/* GeeksforGeeks */}
            {platform === "geeksforgeeks" && (
                <>
                    <p><span className="font-semibold">Rank:</span> {details.rank}</p>
                    <p><span className="font-semibold">Score:</span> {details.overallScore}</p>
                    <p><span className="font-semibold">Total Solved:</span> {details.totalSolved}</p>
                    <p className="mt-2 font-semibold">By Difficulty:</p>
                    <ul className="list-disc list-inside">
                        {Object.entries(details.problemsSolved).map(([diff, val]) => (
                            <li key={diff}>{diff}: {val}</li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
