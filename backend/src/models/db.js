const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Connect to SQLite database (creates file if not exists)
const dbPath = path.resolve(__dirname, "../../blog.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + dbPath + ": " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize Table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

// Helper functions using Promises for async/await
const getAllArticles = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT * FROM articles ORDER BY created_at DESC",
      [],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const getArticleById = (id) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM articles WHERE id = ?", [id], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};

const createArticle = (title, content) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "INSERT INTO articles (title, content) VALUES (?, ?)"
    );
    stmt.run([title, content], function (err) {
      if (err) reject(err);
      resolve({ id: this.lastID, title, content });
    });
    stmt.finalize();
  });
};

const getCount = () => {
  return new Promise((resolve, reject) => {
    db.get("SELECT COUNT(*) as count FROM articles", [], (err, row) => {
      if (err) reject(err);
      resolve(row.count);
    });
  });
};

module.exports = { getAllArticles, getArticleById, createArticle, getCount };
