import { Link } from "react-router-dom";

export default function CardButton({ to, title, subtitle }) {
  return (
    <Link
      to={to}
      style={{
        textDecoration: "none",
        color: "black",
        display: "block",
        marginTop: "30px"
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          maxWidth: "300px",
          margin: "0 auto",
          transition: "0.2s"
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <h3>{title}</h3>
        {subtitle && <p style={{ color: "#666" }}>{subtitle}</p>}
      </div>
    </Link>
  );
}
