import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCourseById } from "../api/courses";

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    fetchCourseById(courseId)
      .then(setCourse)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "60px" }}>
        <p style={{ color: "#6b4c3a" }}>Loading course...</p>
      </div>
    );
  }

  if (notFound || !course) {
    return (
      <div className="page-container" style={{ textAlign: "center", padding: "60px" }}>
        <h1>Course Not Found</h1>
        <p style={{ color: "#6b4c3a", margin: "16px 0" }}>
          The course you're looking for doesn't exist.
        </p>
        <Link to="/courses">
          <button style={{
            padding: "12px 24px",
            background: "#6f4e37",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}>
            Back to Courses
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "20px", fontSize: "0.9rem", color: "#6b4c3a" }}>
        <Link to="/" style={{ color: "#8b5a2b", textDecoration: "none" }}>Home</Link>
        {" / "}
        <Link to="/courses" style={{ color: "#8b5a2b", textDecoration: "none" }}>Courses</Link>
        {" / "}
        <span>{course.title}</span>
      </div>

      {/* Course Header */}
      <div className="page-container" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "20px", marginBottom: "20px" }}>
          <span style={{ fontSize: "3rem" }}>{course.icon}</span>
          <div style={{ flex: 1 }}>
            <h1 style={{ marginBottom: "8px" }}>{course.title}</h1>
            <p style={{ color: "#6b4c3a", fontSize: "1.05rem", marginBottom: "12px" }}>
              {course.descriptionLong}
            </p>
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", color: "#8b5a2b", fontWeight: 600 }}>
              <span>👥 {course.students} students enrolled</span>
              <span>⏱ {course.duration}</span>
              <span>⭐ {course.rating} rating</span>
              <span>👨‍🏫 {course.instructor}</span>
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          padding: "20px",
          background: "#fdfaf5",
          borderRadius: "8px",
          marginTop: "16px",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#4a3623" }}>{course.price}</div>
            <div style={{ color: "#6b4c3a", fontSize: "0.9rem" }}>One-time payment</div>
          </div>
          <button style={{
            padding: "14px 32px",
            background: "#6f4e37",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "1.05rem",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Enroll Now
          </button>
          <button style={{
            padding: "14px 32px",
            background: "transparent",
            color: "#6f4e37",
            border: "2px solid #6f4e37",
            borderRadius: "6px",
            fontSize: "1.05rem",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Add to Wishlist
          </button>
        </div>
      </div>

      {/* What You'll Learn */}
      <div className="page-container" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#4a3623", marginBottom: "16px" }}>What You'll Learn</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "12px",
        }}>
          {course.topics.map((topic, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 14px",
                background: "#fdfaf5",
                borderRadius: "6px",
                borderLeft: "3px solid #8b5a2b",
              }}
            >
              <span style={{ color: "#27ae60", fontWeight: 700 }}>✓</span>
              <span style={{ color: "#4a3623", fontSize: "0.95rem" }}>{topic}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Prerequisites */}
      <div className="page-container" style={{ marginBottom: "24px" }}>
        <h2 style={{ color: "#4a3623", marginBottom: "16px" }}>Prerequisites</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {course.prerequisites.map((req, index) => (
            <li
              key={index}
              style={{
                padding: "10px 14px",
                marginBottom: "8px",
                background: "#fdfaf5",
                borderRadius: "6px",
                color: "#4a3623",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span style={{ color: "#8b5a2b" }}>📌</span>
              {req}
            </li>
          ))}
        </ul>
      </div>

      {/* Course Info Cards */}
      <div style={{ display: "flex", gap: "16px", marginBottom: "24px", flexWrap: "wrap" }}>
        <div style={{
          flex: 1,
          minWidth: "200px",
          background: "#fffdfa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
          borderTop: "3px solid #8b5a2b",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>⏱</div>
          <div style={{ fontWeight: 700, color: "#4a3623" }}>Duration</div>
          <div style={{ color: "#6b4c3a" }}>{course.duration}</div>
        </div>
        <div style={{
          flex: 1,
          minWidth: "200px",
          background: "#fffdfa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
          borderTop: "3px solid #8b5a2b",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📊</div>
          <div style={{ fontWeight: 700, color: "#4a3623" }}>Level</div>
          <div style={{ color: "#6b4c3a", textTransform: "capitalize" }}>{course.level}</div>
        </div>
        <div style={{
          flex: 1,
          minWidth: "200px",
          background: "#fffdfa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
          borderTop: "3px solid #8b5a2b",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>📚</div>
          <div style={{ fontWeight: 700, color: "#4a3623" }}>Topics</div>
          <div style={{ color: "#6b4c3a" }}>{course.topics.length} modules</div>
        </div>
        <div style={{
          flex: 1,
          minWidth: "200px",
          background: "#fffdfa",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          textAlign: "center",
          borderTop: "3px solid #8b5a2b",
        }}>
          <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>👨‍🏫</div>
          <div style={{ fontWeight: 700, color: "#4a3623" }}>Instructor</div>
          <div style={{ color: "#6b4c3a" }}>{course.instructor}</div>
        </div>
      </div>

      {/* Back Button */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <Link to="/courses" style={{
          display: "inline-block",
          padding: "12px 28px",
          background: "#6f4e37",
          color: "white",
          textDecoration: "none",
          borderRadius: "6px",
          fontWeight: 600,
        }}>
          ← Back to All Courses
        </Link>
      </div>
    </div>
  );
}

export default CourseDetail;
