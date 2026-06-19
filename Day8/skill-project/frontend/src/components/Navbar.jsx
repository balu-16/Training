import { useState, useContext, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { CategoryContext } from "./CategoryContext";
import { fetchCourses } from "../api/courses";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { dark, setDark } = useContext(ThemeContext);
  const { setCategory } = useContext(CategoryContext);
  const navigate = useNavigate();
  const [navCourses, setNavCourses] = useState([]);

  useEffect(() => {
    fetchCourses()
      .then((courses) => setNavCourses(courses.slice(0, 4)))
      .catch(console.error);
  }, []);

  function handleCourseClick(courseCategory) {
    setCategory(courseCategory);
    navigate("/");
    setOpen(false);
  }

  return (
    <nav>
      <Link to="/" className="logo" onClick={() => setCategory("all")}>
        Skill<span>Hub</span>
      </Link>

      <ul>
        <li>
          <NavLink to="/" end onClick={() => setCategory("all")}>
            Home
          </NavLink>
        </li>

        <li
          className="dropdown-wrapper"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <NavLink to="/courses">Courses ▾</NavLink>
          {open && (
            <div className="dropdown-menu">
              <Link to="/courses" onClick={() => setOpen(false)}>
                All Courses
              </Link>
              {navCourses.map((course) => (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  onClick={() => setOpen(false)}
                >
                  {course.icon} {course.title}
                </Link>
              ))}
            </div>
          )}
        </li>

        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>

      <button className="theme-toggle" onClick={() => setDark(!dark)}>
        {dark ? "☀ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}

export default Navbar;
