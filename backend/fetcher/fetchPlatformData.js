const fetchLeetCodeData = require('./fetcher');
const fetchcodeforceData = require('./fetchCodeForceData');
const fetchGFGData = require('./fetchGFGData');

const fetchPlatformData = async (platform, username) => {
    if (!platform || !username)
        throw new Error("platform and username required");

    switch (platform.toLowerCase()) {
        case 'leetcode':
            return await fetchLeetCodeData(username);
        case 'codeforces':
             return await fetchcodeforceData(username);
        case 'geeksforgeeks':
             return await fetchGFGData(username);     

        default:
            throw new Error(`unsupported platform: ${platform}`);

    }
};

module.exports = fetchPlatformData;