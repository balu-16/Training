import { useState, useContext } from "react";

import { ThemeContext } from "./ThemeContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { dark, setDark } = useContext(ThemeContext);

  return (
    <nav>
      <h2>SkillHub</h2>

      <ul>
        <li>Home</li>

        <li onClick={() => setOpen(!open)}>
          Courses ▼
          {open && (
            <div className="dropdown">
              <p>React</p>

              <p>Java</p>

              <p>Node JS</p>
            </div>
          )}
        </li>

        <li>Contact</li>
      </ul>

      <button onClick={() => setDark(!dark)}>
        {dark ? "Light" : "Dark"}</button>
    </nav>
  );
}

export default Navbar;
