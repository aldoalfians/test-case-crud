import { Link } from "react-router-dom";

export default function BrandLogo({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <Link
      to="/admin"
      style={{
        display: "flex",
        padding: "24px 16px",
        justifyContent: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: 16 }}>
        <p>Superindo</p>
      </div>
    </Link>
  );
}
