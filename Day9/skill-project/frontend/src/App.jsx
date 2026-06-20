import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import LandingNavbar from "./components/LandingNavbar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ThemeProvider } from "./components/ThemeContext";
import { CategoryProvider } from "./components/CategoryContext";

function App() {
  return (
    <ThemeProvider>
      <CategoryProvider>
        <Routes>
          {/* Landing page - LandingNavbar + Footer, no sidebar */}
          <Route
            path="/"
            element={
              <>
                <LandingNavbar />
                <main>
                  <Landing />
                </main>
                <Footer />
              </>
            }
          />

          {/* Standalone auth pages - no navbar/sidebar/footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated pages - Navbar + Sidebar, no footer */}
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <div className="layout">
                  <Sidebar />
                  <main>
                    <Home />
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/courses"
            element={
              <>
                <Navbar />
                <div className="layout">
                  <Sidebar />
                  <main>
                    <Courses />
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/courses/:courseId"
            element={
              <>
                <Navbar />
                <div className="layout">
                  <Sidebar />
                  <main>
                    <CourseDetail />
                  </main>
                </div>
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <div className="layout">
                  <Sidebar />
                  <main>
                    <Contact />
                  </main>
                </div>
              </>
            }
          />
        </Routes>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
