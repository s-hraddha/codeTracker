const axios = require("axios");
const cheerio = require("cheerio");


const CODECHEF_BASE_URL = 'https://www.codechef.com';
const CODECHEF_DEFAULT_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Connection': 'keep-alive',
  'Upgrade-Insecure-Requests': '1',
  'Sec-Fetch-Dest': 'document',
  'Sec-Fetch-Mode': 'navigate',
  'Sec-Fetch-Site': 'none',
  'Cache-Control': 'max-age=0'
};

const fetchCodeChefData = async (username) => {
  try {
    const profileUrl = `${CODECHEF_BASE_URL}/users/${username}`;

    const response = await axios.get(profileUrl, {
      headers: CODECHEF_DEFAULT_HEADERS,
      timeout: 30000
    });

    const $ = cheerio.load(response.data);

    const ratingRanks = $("div.rating-ranks");

    const currentRating = parseInt($(".rating-number").first().text()) || 0;
    const highestRating = parseInt(
      $(".rating-number").parent().find("small").text().replace(/[^\d]/g, "")) || 0;

    const stars = $(".rating").first().text().trim() || "0★";


    let globalRank = null;
    let countryRank = null;

    const rankItems = $('ul.inline-list li');
    rankItems.each((_, el) => {
      const label = $(el).text().toLowerCase();
      const valueText = $(el).find('strong').text().trim();

      if (label.includes('global')) {
        globalRank = /^\d+$/.test(valueText) ? parseInt(valueText) : null;
      } else if (label.includes('country')) {
        countryRank = /^\d+$/.test(valueText) ? parseInt(valueText) : null;
      }
    });


    // Global Rank & Country Rank (with debug logs)
    // DEBUG: Print entire .rating-ranks HTML
    console.log("\n=== DEBUG: .rating-ranks HTML ===");
    console.log(ratingRanks.html() || "No content inside .rating-ranks");


    const totalSolved = $(".rating-data-section");
    const totalProblemsSolved = totalSolved.find("h3").last().text().split(":")[1].trim();


    return {
      platform: 'codechef',
      username,
      currentRating,
      highestRating,
      globalRank,
      countryRank,
      stars,
      totalProblemsSolved

    };

  } catch (error) {
    console.error(`codechef fetch error: {error.message}`);
    throw new Error(
      error.message.includes('404')
        ? 'Access blocked by CodeChef (anti-bot protection)'
        : `Failed to fetch CodeChef data: ${error.message}`
    )
  }

};

module.exports = fetchCodeChefData;