import { useState } from "react";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    alert("Message Sent Successfully");

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  }

  return (
    <div className="page-container">

      <h1>Contact Us</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              name: e.target.value
            })
          }
        />

        <br /><br />

        <input
          type="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
            })
          }
        />

        <br /><br />

        <textarea
          placeholder="Enter Message"
          rows="5"
          value={formData.message}
          onChange={(e) =>
            setFormData({
              ...formData,
              message: e.target.value
            })
          }
        />

        <br /><br />

        <button type="submit">
          Send Message
        </button>

      </form>

    </div>
  );
}

export default Contact;
