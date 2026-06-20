import { useEffect, useState } from "react";
import { fetchStats } from "../api/courses";

function Hero() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);

  return (
    <section className="hero">
      <h1>Learn Modern Technology</h1>
      <p>
        Build real world applications using React, Java and MERN Stack. Master the
        skills that top companies demand.{" "}
        {stats && `${stats.totalCourses} courses with ${stats.totalStudents.toLocaleString()}+ students.`}
      </p>
      <button>Start Learning →</button>
    </section>
  );
}

export default Hero;
