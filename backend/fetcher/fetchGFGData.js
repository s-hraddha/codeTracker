const puppeteer = require("puppeteer");
const { cacheDirectory } = require("../config/puppeteer.config.cjs");

const fetchGFGData = async (username) => {
    console.log("Fetching GFG data for:", username);

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        userDataDir: cacheDirectory,
    });

    const page = await browser.newPage();

    try {
        await page.setUserAgent(
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
        );

        await page.goto(`https://www.geeksforgeeks.org/user/${username}/`, {
            waitUntil: "networkidle2",
            timeout: 30000,
        });

        const selector = ".profilePicSection_head_userHandle__oOfFy";
        await page.waitForSelector(selector, { timeout: 10000 });

        const data = await page.evaluate(() => {
            const extractInnerText = (selector) => {
                const element = document.querySelector(selector);
                return element ? element.innerText.trim() : null;
            };

            const rank = (() => {
                const spanTags = Array.from(document.querySelectorAll("span"));
                const rankTag = spanTags.find(tag => tag.innerText.includes("Rank"));
                return rankTag ? rankTag.innerText.trim().split(" ")[0] : null;
            })();

            const overallScore = (() => {
                const divs = Array.from(document.querySelectorAll("div"));
                const index = divs.findIndex(div => div.innerText.trim() === "Coding Score");
                return index !== -1 && divs[index + 1] ? divs[index + 1].innerText.trim() : null;
            })();

            const totalSolved = (() => {
                const divs = Array.from(document.querySelectorAll("div"));
                const index = divs.findIndex(div => div.innerText.trim() === "Problem Solved");
                return index !== -1 && divs[index + 1] ? divs[index + 1].innerText.trim() : null;
            })();

            const streak = extractInnerText(".circularProgressBar_head_mid_streakCnt__MFOF1");

            // const getCountFromLabel = (label) => {
            //     const cards = Array.from(document.querySelectorAll("div"));
            //     const target = cards.find(card => card.innerText.trim() === label);
            //     if (!target) return 0;

            //     const valueElement = target.parentElement?.querySelector("div:nth-child(2)");
            //     if (!valueElement) return 0;

            //     const value = parseInt(valueElement.innerText.trim());
            //     return isNaN(value) ? 0 : value;
            // };

            const problems = document.querySelector(".problemListSection_head__JAiP6");

            const getProblemCount = (index) => {
                try {
                    const section = problems?.children[index]?.querySelectorAll("li") || [];
                    return section.length;
                } catch {
                    return 0;
                }
            };
            const schoolCount = getProblemCount(0);
            const basicCount = getProblemCount(1);
            const easyCount = getProblemCount(2);
            const mediumCount = getProblemCount(3);
            const hardCount = getProblemCount(4);

            return {
                rank,
                overallScore,
                totalSolved,
                streak,
                problemsSolved:{
                  school:schoolCount,  
                  basic: basicCount,
                  easy: easyCount,
                  medium: mediumCount,
                  hard: hardCount,
                },
            };
        });


        console.log("Fetched successfully.");
        await browser.close();

        return data; // ✅ Fixed here
    } catch (error) {
        console.error("Error fetching GFG data:", error.message);
        await browser.close();
        return {
            status: "error",
            message: error.message,
        };
    }
};

module.exports = fetchGFGData;
