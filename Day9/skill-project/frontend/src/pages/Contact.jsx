import { useState } from "react";
import { submitContactForm } from "../api/courses";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Failed to submit:", err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-container">
      <h1>Contact Us</h1>

      <p style={{ color: "#6b4c3a", marginBottom: "24px", fontSize: "1.05rem" }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      {submitted && (
        <div style={{
          background: "#e8f5e9",
          color: "#2e7d32",
          padding: "14px 20px",
          borderRadius: "6px",
          marginBottom: "20px",
          fontWeight: 600,
        }}>
          ✅ Message sent successfully! We'll get back to you soon.
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Subject</label>
          <input
            type="text"
            placeholder="What is this about?"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            placeholder="Write your message here..."
            rows="5"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>

      <div className="contact-info">
        <div className="contact-info-card">
          <div className="info-icon">📧</div>
          <h3>Email</h3>
          <p>info@skillhub.com</p>
        </div>
        <div className="contact-info-card">
          <div className="info-icon">📞</div>
          <h3>Phone</h3>
          <p>+91 98765 43210</p>
        </div>
        <div className="contact-info-card">
          <div className="info-icon">📍</div>
          <h3>Location</h3>
          <p>Hyderabad, India</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;
