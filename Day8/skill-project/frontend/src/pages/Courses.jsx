import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCourses } from "../api/courses";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses()
      .then(setCourses)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h1>Our Courses</h1>

      <p style={{ color: "#6b4c3a", marginBottom: "24px", fontSize: "1.05rem" }}>
        Explore our comprehensive course catalog. Click on any course to see full details, syllabus, and enrollment options.
      </p>

      {loading ? (
        <p style={{ textAlign: "center", color: "#6b4c3a", padding: "40px" }}>
          Loading courses...
        </p>
      ) : (
        <div className="course-list">
          {courses.map((course) => (
            <div key={course.id} className="course-item">
              <span className="course-icon">{course.icon}</span>
              <div className="course-info">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p style={{ color: "#8b5a2b", fontWeight: 600, marginTop: "6px" }}>
                  👥 {course.students} students · ⏱ {course.duration} · ⭐ {course.rating} · {course.level}
                </p>
              </div>
              <div className="course-action">
                <Link to={`/courses/${course.id}`}>
                  <button>View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Courses;
