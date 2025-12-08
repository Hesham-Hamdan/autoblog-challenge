import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../api/client";

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await client.get(`/articles/${id}`);
        setArticle(response.data);
      } catch (err) {
        console.error("Error fetching article:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [id]);

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (!article)
    return <div style={{ textAlign: "center" }}>Article not found.</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1rem" }}>
      <Link to="/" style={{ textDecoration: "none", color: "#666" }}>
        ← Back to Home
      </Link>

      <article style={{ marginTop: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          {article.title}
        </h1>
        <p style={{ color: "#888", marginBottom: "2rem" }}>
          Published on {new Date(article.created_at).toLocaleDateString()}
        </p>
        <div
          style={{
            lineHeight: "1.8",
            fontSize: "1.1rem",
            whiteSpace: "pre-wrap",
          }}
        >
          {article.content}
        </div>
      </article>
    </div>
  );
};

export default Article;
