const axios = require('axios');

const fetchcodeforceData = async (username) => {
    try {
        const userInfo = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        const user = userInfo.data.result[0];

        const userSubmissions = await axios.get(`https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`)
        const submissions = userSubmissions.data.result;
        const solvedSet = new Set();

         submissions.forEach((submission) => {
            if (
                submission.verdict === "OK" &&
                submission.problem &&
                submission.problem.contestId &&
                submission.problem.index
            ) {
                const problemID = `${submission.problem.contestId}-${submission.problem.index}`;
                solvedSet.add(problemID);
            }
        });
        
        console.log("DEBUG: user object from Codeforces:", user);
        
        const isMaxRankInvalid = user.maxRank === user.handle;
        return {
            handle: user.handle,
            rating: user.rating ?? "unrated",
            maxRating: user.maxRating ?? "unrated",
            rank: user.rank ?? "unranked",
             maxRank: isMaxRankInvalid ? (user.rank ?? "unranked") : user.maxRank, 
            totalProblemsSolved: solvedSet.size,
        };

    } catch (error) {
        console.error("Error fetching Codeforces data:", error.message);
        return null;
    }
}

module.exports = fetchcodeforceData;