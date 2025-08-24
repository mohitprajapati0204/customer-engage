import React from "react";
import "./Contact.css";
import { FaLinkedin, FaGithub, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Contact() {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Me</h1>

      <div className="contact-card">
        <h2>Get in Touch</h2>
        <p className="contact-subtext">
          I’d love to connect! Feel free to reach out through phone, email, or
          social platforms.
        </p>

        <div className="contact-details">
          <a href="tel:+917042334782" className="contact-item">
            <FaPhoneAlt className="icon" style={{ marginRight: "8px" }} /> +91
            7042334782
          </a>
          <a
            href="mailto:mohitprajapati0204@gmail.com"
            className="contact-item"
          >
            <FaEnvelope className="icon" style={{ marginRight: "8px" }} />
            mohitprajapati0204@gmail.com
          </a>
        </div>

        <div className="contact-social">
          <a
            href="https://www.linkedin.com/in/mohitprajapati0204/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link linkedin"
          >
            <FaLinkedin className="icon" /> LinkedIn
          </a>
          <a
            href="https://github.com/mohitprajapati0204"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link github"
          >
            <FaGithub className="icon" /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
