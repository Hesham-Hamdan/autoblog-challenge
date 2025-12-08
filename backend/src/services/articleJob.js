const cron = require("node-cron");
const db = require("../models/db");
const aiClient = require("./aiClient");

// 1. Core function to trigger generation and save to DB
const generateAndSaveArticle = async () => {
  try {
    const article = await aiClient.generateContent();
    await db.createArticle(article.title, article.content);
    console.log(`[JOB] New article created: "${article.title}"`);
  } catch (error) {
    console.error("[JOB] Failed to generate article:", error);
  }
};

// 2. Scheduled Job: Runs every day at midnight (0 0 * * *)
const startScheduler = () => {
  console.log("[SCHEDULER] Job initialized: 1 article per day.");
  cron.schedule("0 0 * * *", () => {
    console.log("[SCHEDULER] Triggering daily article generation...");
    generateAndSaveArticle();
  });

  // For testing the automation generation
  // cron.schedule("* * * * *", () => {
  //   console.log("[SCHEDULER] Triggering test generation...");
  //   generateAndSaveArticle();
  // });
};

// 3. Initial Seed: Checks if we have < 3 articles. If so, create them.
const checkAndSeedData = async () => {
  try {
    const count = await db.getCount();
    console.log(`[DB] Current article count: ${count}`);

    if (count < 3) {
      const needed = 3 - count;
      console.log(`[INIT] Seeding ${needed} initial articles...`);
      for (let i = 0; i < needed; i++) {
        await generateAndSaveArticle();
      }
    }
  } catch (error) {
    console.error("[INIT] Error seeding data:", error);
  }
};

module.exports = { startScheduler, checkAndSeedData, generateAndSaveArticle };
