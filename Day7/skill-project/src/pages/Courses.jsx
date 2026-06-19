function Courses() {
  const courseList = [
    "React JS",
    "Java Programming",
    "Node JS",
    "MongoDB",
    "MERN Stack",
    "Spring Boot"
  ];

  return (
    <div className="page-container">

      <h1>Our Courses</h1>

      {
        courseList.map((course, index) => (
          <div key={index} className="course-item">
            📘 {course}
          </div>
        ))
      }

    </div>
  );
}

export default Courses;
