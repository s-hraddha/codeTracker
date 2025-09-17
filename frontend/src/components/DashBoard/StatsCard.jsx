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

export default function StatsCard({ platforms }) {
    let totalSolved = 0;

    const platformStats = platforms.map(({ platform, data }) => {
        let solved = 0;
        let rank = null;

        if (platform === "leetcode" && data.submitStats) {
            const allStats = data.submitStats.acSubmissionNum.find((s) => s.difficulty === "All");
            solved = allStats ? allStats.count : 0;
            rank = data.profile?.ranking;
        } else if (platform === "codechef") {
            solved = parseInt(data.totalProblemsSolved || 0);
            rank = data.currentRating;
        } else if (platform === "codeforces") {
            solved = parseInt(data.totalProblemsSolved || 0);
            rank = data.rank;
        } else if (platform === "geeksforgeeks") {
            solved = parseInt(data.totalSolved || 0);
            rank = data.rank;
        }

        totalSolved += solved;

        return (
            <div
                key={platform}
                className={`p-6 rounded-xl border shadow-lg bg-gradient-to-br ${platformColors[platform]} text-white hover:scale-105 transition`}
            >
                <div className="flex justify-center mb-3">
                    <img src={platformLogos[platform]} alt={platform} className="w-12 h-12 rounded-full" />
                </div>
                <h2 className="text-lg font-semibold capitalize">{platform}</h2>
                <p className="mt-1">Solved: <span className="font-bold">{solved}</span></p>
                {rank && <p className="text-sm opacity-90">Rank: <span className="font-semibold">{rank}</span></p>}
            </div>
        );
    });

    return (
        <div className="p-6">
            {/* Total Solved */}
            <div className="bg-gradient-to-br from-violet-900 to-violet-700 p-6 rounded-xl shadow-xl text-center text-white mb-6 border border-violet-400">
                <h2 className="text-2xl font-bold mb-2">Total Problems Solved</h2>
                <p className="text-4xl font-extrabold text-yellow-300">{totalSolved}</p>
            </div>

            {/* Per Platform */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {platformStats}
            </div>
        </div>
    );
}
