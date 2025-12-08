import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        padding: "1rem",
        background: "#333",
        color: "#fff",
        marginBottom: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontSize: "1.5rem",
            fontWeight: "bold",
          }}
        >
          🚀 AutoBlog
        </Link>
        <div>
          {/* Placeholder for future links */}
          <Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
