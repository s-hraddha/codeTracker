const puppeteer = require('puppeteer');

const fetchCodechefData = async (username) => {
  const url = `https://www.codechef.com/users/${username}`;

  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox']
  });

  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 0 });

    // Wait for the rating section to appear
    await page.waitForSelector('.rating-header', { timeout: 15000 });

    const data = await page.evaluate(() => {
      const getText = (selector) => {
        const el = document.querySelector(selector);
        return el ? el.innerText.trim() : null;
      };

      const name = getText('.user-profile-container header h1');
      const currentRating = getText('.rating-number');
      const stars = getText('.rating-star');
      const highestRating = getText('.rating-header small');
      const globalRank = getText('.rating-ranks .global-rank');
      const countryRank = getText('.rating-ranks .country-rank');

      const ratingData = Array.from(document.querySelectorAll('.rating-table tr'))
        .slice(1) // skip header
        .map(row => {
          const cols = row.querySelectorAll('td');
          return {
            contest: cols[0]?.innerText.trim(),
            rating: cols[1]?.innerText.trim(),
            rank: cols[2]?.innerText.trim(),
            solved: cols[3]?.innerText.trim()
          };
        });

      const recentActivity = Array.from(document.querySelectorAll('.recent-activity-section li'))
        .map(li => li.innerText.trim());

      return {
        name,
        currentRating,
        highestRating,
        stars,
        globalRank,
        countryRank,
        ratingData,
        recentActivity
      };
    });

    await browser.close();
    return data;

  } catch (error) {
    await browser.close();
    throw new Error('Failed to fetch CodeChef data: ' + error.message);
  }
};

module.exports = { fetchCodechefData };
