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
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchCourses()
      .then((courses) => setNavCourses(courses.slice(0, 4)))
      .catch(console.error);

    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  function handleCourseClick(courseCategory) {
    setCategory(courseCategory);
    navigate("/home");
    setOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  }

  return (
    <nav>
      <Link to={user ? "/home" : "/"} className="logo" onClick={() => setCategory("all")}>
        Skill<span>Hub</span>
      </Link>

      <ul>
        <li>
          <NavLink to="/home" end onClick={() => setCategory("all")}>
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

      {user ? (
        <div className="nav-user">
          <span className="nav-user-name">
            {user.name.charAt(0).toUpperCase()}
          </span>
          <button className="btn btn-nav-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="nav-auth">
          <Link to="/login" className="btn btn-nav-secondary">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-nav-primary">
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
