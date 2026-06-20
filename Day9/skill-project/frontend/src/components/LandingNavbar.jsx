import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

function LandingNavbar() {
  const { dark, setDark } = useContext(ThemeContext);

  return (
    <nav className="landing-navbar">
      <Link to="/" className="logo">
        Skill<span>Hub</span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button className="theme-toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀ Light" : "🌙 Dark"}
        </button>

        <div className="nav-auth">
          <Link to="/login" className="btn btn-nav-secondary">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-nav-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default LandingNavbar;
