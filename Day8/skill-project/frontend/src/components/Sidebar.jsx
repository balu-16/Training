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

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(["all", ...cats]))
      .catch(console.error);
  }, []);

  function handleCategoryClick(catId) {
    setCategory(catId);
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
    </aside>
  );
}

export default Sidebar;
