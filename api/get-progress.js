require('dotenv').config();
const { Client } = require("@notionhq/client");


const notion = new Client({ auth: process.env.NOTION_API_KEY });
const DATABASE_ID = process.env.DATABASE_ID;



async function getProgressData() {
  try {
    let hasMore = true;
    let nextCursor = undefined;
    let awakeningCount = 0;
    let momentumCount = 0;

    while (hasMore) {
      const response = await notion.databases.query({
        database_id: DATABASE_ID,
        start_cursor: nextCursor,
      });

      response.results.forEach((page) => {
        const teamProperty = page.properties["Team"];
        const teamNames = teamProperty?.select?.name || "";  // Update to select
        if (teamNames === "Awakening youth") awakeningCount++;
        if (teamNames === "Momentum youth") momentumCount++;
      });

      hasMore = response.has_more;
      nextCursor = response.next_cursor;
    }

    return {
      "Awakening Youth": awakeningCount,
      "Momentum Youth": momentumCount,
      total: 100,
    };
  } catch (error) {
    console.error("Error fetching data from Notion:", error);
    return {
      "Awakening youth": 0,
      "Momentum youth": 0,
      total: 100,
    };
  }
}

module.exports = async (req, res) => {
  const progressData = await getProgressData();
  res.json(progressData);
};
