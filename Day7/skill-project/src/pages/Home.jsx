import { useState, useEffect } from "react";

import Hero from "../components/Hero";

import CourseCard from "../components/CourseCard";

function Home() {
  const [search, setSearch] = useState("");

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses([
      {
        title: "React JS",
        students: 1000,
      },

      {
        title: "Java Programming",
        students: 800,
      },

      {
        title: "MERN Stack",
        students: 900,
      },
    ]);
  }, []);

  return (
    <>
      <Hero />

      <input
        className="search"
        placeholder="Search Course"
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="courses">
        {courses

          .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))

          .map((course, index) => (
            <CourseCard
              key={index}
              title={course.title}
              students={course.students}
            />
          ))}
      </div>
    </>
  );
}

export default Home;
