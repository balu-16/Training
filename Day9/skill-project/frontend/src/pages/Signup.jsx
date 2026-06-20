import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  const user = localStorage.getItem("user");
  if (user) {
    return <Navigate to="/home" replace />;
  }

  // Password strength calculation
  const getPasswordStrength = (pass) => {
    if (!pass) return { level: "", score: 0, label: "" };

    let score = 0;
    const checks = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      numbers: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass),
    };

    score = Object.values(checks).filter(Boolean).length;

    if (score <= 2) return { level: "weak", score: 1, label: "Weak" };
    if (score <= 3) return { level: "fair", score: 2, label: "Fair" };
    if (score <= 4) return { level: "medium", score: 3, label: "Medium" };
    return { level: "strong", score: 4, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (passwordStrength.level === "weak") {
      setError("Please choose a stronger password");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Left Side - Image/Branding */}
      <div className="auth-image-side">
        <div className="auth-image-content">
          <div className="auth-brand">
            <h1>
              Skill<span>Hub</span>
            </h1>
            <p>Start Your Learning Journey</p>
          </div>
          <div className="auth-features">
            <div className="auth-feature">
              <span className="feature-icon">🎯</span>
              <span>50+ Expert-Led Courses</span>
            </div>
            <div className="auth-feature">
              <span className="feature-icon">💻</span>
              <span>Hands-On Projects</span>
            </div>
            <div className="auth-feature">
              <span className="feature-icon">🏆</span>
              <span>Industry Certificates</span>
            </div>
          </div>
          <div className="auth-stats-preview">
            <div className="mini-stat">
              <span className="mini-stat-number">10K+</span>
              <span className="mini-stat-label">Students</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-number">95%</span>
              <span className="mini-stat-label">Success</span>
            </div>
            <div className="mini-stat">
              <span className="mini-stat-number">4.8★</span>
              <span className="mini-stat-label">Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-form-side">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join thousands of learners today</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {password && (
                <div className="password-strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`strength-bar ${
                          bar <= passwordStrength.score
                            ? passwordStrength.level
                            : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`strength-label ${passwordStrength.level}`}>
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <div className="password-mismatch">Passwords do not match</div>
              )}
            </div>

            <div className="terms-checkbox">
              <label>
                <input type="checkbox" required />
                <span>
                  I agree to the{" "}
                  <Link to="/terms" className="auth-link">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="auth-link">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="auth-divider">
            <span>or sign up with</span>
          </div>

          <div className="social-login">
            <button className="btn btn-social btn-google">
              <span className="social-icon">G</span>
              Google
            </button>
            <button className="btn btn-social btn-github">
              <span className="social-icon">⚙</span>
              GitHub
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
