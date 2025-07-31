const axios = require("axios");

//function fetches user profile data from leetcode 
const fetchLeetcodeData = async (username) => {
    //structure to fetch desired fields from leetcode
  const query = {
    query: `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            realName
          }
        }
      }
    `,
    //variables sent along with query
    variables: { username },
  };

  try {
    //send a POST request to Leetcode graphql endpoints
    const res = await axios.post('https://leetcode.com/graphql', query, {
      headers: {
        'Content-Type': 'application/json',
        'Referer': `https://leetcode.com/${username}/`,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/91.0 Safari/537.36',
        'Origin': 'https://leetcode.com',
      },
    });
    //print the response 
    console.log("LeetCode response:", JSON.stringify(res.data, null, 2));
    
    //Extract the matchedUser object safely using optional chaining 
    const matchedUser = res.data?.data?.matchedUser;

    if (!matchedUser) {
      console.log("matchedUser is null for:", username);
      return null;
    }

    return matchedUser;
  } catch (error) {
    console.error("Error fetching LeetCode data:", error.message);
    if (error.response?.data) {
      console.error("LeetCode error response:", error.response.data);
    }
    return null;
  }
};

module.exports = fetchLeetcodeData;
