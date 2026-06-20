import { Link, Navigate } from "react-router-dom";

function Landing() {
  // Redirect to home if already logged in
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <h1>
            Master Modern <span className="highlight">Tech Skills</span>
          </h1>
          <p>
            Build real-world applications using React, Java, and the MERN Stack.
            Join thousands of learners advancing their careers with SkillHub.
          </p>
          <div className="landing-cta">
            <Link to="/signup" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
        <div className="landing-hero-image">
          <div className="hero-illustration">
            <div className="code-block">
              <div className="code-line">
                <span className="keyword">const</span> skills = [
              </div>
              <div className="code-line indent">
                <span className="string">"React"</span>,
              </div>
              <div className="code-line indent">
                <span className="string">"Node.js"</span>,
              </div>
              <div className="code-line indent">
                <span className="string">"MongoDB"</span>,
              </div>
              <div className="code-line indent">
                <span className="string">"Express"</span>
              </div>
              <div className="code-line">];</div>
              <div className="code-line">
                <span className="keyword">const</span> you = <span className="string">"Hired"</span>;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <h2>Why Choose SkillHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">&#127919;</div>
            <h3>Project-Based Learning</h3>
            <p>
              Build real applications from scratch. No toy examples -
              production-ready code that impresses employers.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128640;</div>
            <h3>Modern Tech Stack</h3>
            <p>
              Learn the technologies top companies actually use: React, Node.js,
              MongoDB, Express, and more.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128101;</div>
            <h3>Community Support</h3>
            <p>
              Join a community of 10,000+ learners. Get help, share projects,
              and grow together.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">&#128220;</div>
            <h3>Certificates</h3>
            <p>
              Earn recognized certificates upon completion. Showcase your skills
              to potential employers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats">
        <div className="stat-item">
          <div className="stat-number">10,000+</div>
          <div className="stat-label">Active Learners</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">50+</div>
          <div className="stat-label">Expert Courses</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">95%</div>
          <div className="stat-label">Success Rate</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">4.8&#9733;</div>
          <div className="stat-label">Average Rating</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <p>
          Join thousands of learners who have transformed their careers with
          SkillHub.
        </p>
        <Link to="/signup" className="btn btn-primary btn-large">
          Create Free Account
        </Link>
      </section>
    </div>
  );
}

export default Landing;
