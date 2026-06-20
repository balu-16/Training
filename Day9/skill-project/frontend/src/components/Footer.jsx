function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>SkillHub</h3>
          <p>
            A modern learning platform to help you master the latest technologies
            and build real-world applications. Start your journey today.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li><a href="/courses">Frontend</a></li>
            <li><a href="/courses">Backend</a></li>
            <li><a href="/courses">Database</a></li>
            <li><a href="/courses">Cloud</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <p>
            📧 info@skillhub.com<br />
            📞 +91 98765 43210<br />
            📍 Hyderabad, India
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 SkillHub Learning Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
