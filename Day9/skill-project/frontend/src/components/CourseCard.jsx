import { Link } from "react-router-dom";

function CourseCard({ id, title, students, description, level, duration, icon }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-icon">{icon}</span>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
      <div className="card-meta">
        <span>👥 {students} students</span>
        <span>⏱ {duration}</span>
      </div>
      <div className="card-footer">
        <span className={`level ${level}`}>{level}</span>
        <Link to={`/courses/${id}`}>
          <button>View Course</button>
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
