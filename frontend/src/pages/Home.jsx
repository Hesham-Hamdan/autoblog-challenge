import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await client.get("/articles");
        setArticles(response.data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
        setError("Could not load articles. Is the backend running?");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return <div style={{ textAlign: "center" }}>Loading articles...</div>;
  if (error)
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      <h1>Latest Tech Insights</h1>
      {articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {articles.map((article) => (
            <div
              key={article.id}
              style={{
                border: "1px solid #ddd",
                padding: "1.5rem",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <h2 style={{ margin: "0 0 0.5rem 0" }}>{article.title}</h2>
              <p style={{ color: "#666", fontSize: "0.9rem" }}>
                {new Date(article.created_at).toLocaleDateString()}
              </p>
              <p>{article.content.substring(0, 100)}...</p>
              <Link
                to={`/article/${article.id}`}
                style={{
                  display: "inline-block",
                  marginTop: "10px",
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
