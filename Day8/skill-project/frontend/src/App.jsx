import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import { ThemeProvider } from "./components/ThemeContext";
import { CategoryProvider } from "./components/CategoryContext";

function App() {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <Navbar />

        <div className="layout">
          <Sidebar />

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
