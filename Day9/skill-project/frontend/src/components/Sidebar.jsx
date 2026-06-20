import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "./CategoryContext";
import { fetchCategories } from "../api/courses";

const categoryIcons = {
  all: "📚",
  frontend: "🎨",
  backend: "⚙️",
  database: "🗄️",
  cloud: "☁️",
  devops: "🔄",
};

function Sidebar() {
  const { category, setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(["all", ...cats]))
      .catch(console.error);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function handleCategoryClick(catId) {
    setCategory(catId);
    navigate("/home");
  }

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <aside>
      <h3>Categories</h3>
      {categories.map((cat) => (
        <div
          key={cat}
          className={`sidebar-item ${category === cat ? "active" : ""}`}
          onClick={() => handleCategoryClick(cat)}
        >
          <span className="icon">{categoryIcons[cat] || "📘"}</span>
          {cat === "all" ? "All Courses" : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </div>
      ))}

      <div className="sidebar-divider" />

      {user && (
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user.name}</span>
            <span className="sidebar-user-email">{user.email}</span>
          </div>
        </div>
      )}

      <div className="sidebar-item sidebar-logout" onClick={handleLogout}>
        <span className="icon">🚪</span>
        Logout
      </div>
    </aside>
  );
}

export default Sidebar;
