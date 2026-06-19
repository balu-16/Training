import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import CourseCard from "../components/CourseCard";
import { CategoryContext } from "../components/CategoryContext";
import { fetchCourses, fetchStats } from "../api/courses";

function Home() {
  const [search, setSearch] = useState("");
  const { category } = useContext(CategoryContext);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0, avgRating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchCourses(category), fetchStats()])
      .then(([coursesData, statsData]) => {
        setCourses(coursesData);
        setStats(statsData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Hero />

      <div className="stats">
        <div className="stat-card">
          <div className="number">{stats.totalStudents.toLocaleString()}+</div>
          <div className="label">Students Enrolled</div>
        </div>
        <div className="stat-card">
          <div className="number">{stats.totalCourses}</div>
          <div className="label">Courses Available</div>
        </div>
        <div className="stat-card">
          <div className="number">50+</div>
          <div className="label">Projects Built</div>
        </div>
        <div className="stat-card">
          <div className="number">95%</div>
          <div className="label">Success Rate</div>
        </div>
      </div>

      <div className="section-header">
        <h2>
          {category === "all"
            ? "Popular Courses"
            : `${
                category.charAt(0).toUpperCase() + category.slice(1)
              } Courses`}
        </h2>
        <Link to="/courses" className="view-all">
          View All →
        </Link>
      </div>

      <input
        className="search"
        placeholder="🔍 Search courses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <p style={{ textAlign: "center", color: "#6b4c3a", padding: "40px" }}>
          Loading courses...
        </p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: "center", color: "#6b4c3a", padding: "40px" }}>
          No courses found for this category.
        </p>
      ) : (
        <div className="courses">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              title={course.title}
              students={course.students}
              description={course.description}
              level={course.level}
              duration={course.duration}
              icon={course.icon}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
