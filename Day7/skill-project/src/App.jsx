import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import { ThemeProvider } from "./components/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Navbar />

      <div className="layout">
        <Sidebar />

        <main>
          <Home />
        </main>
      </div>

      <Footer />
    </ThemeProvider>
  );
}

export default App;
