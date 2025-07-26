import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

const Contact: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="contact">
      <div className="contact__container">
        <h2 className="contact__title" data-aos="fade-up">
          Get in <span>Touch</span>
        </h2>

        <p
          className="contact__subtitle"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Have questions or need help? Send us a message and we’ll respond as
          soon as possible.
        </p>

        <form className="contact__form" data-aos="fade-up" data-aos-delay="200">
          <div className="form-group">
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea placeholder="Your Message" required></textarea>
          </div>
          <button type="submit" className="contact__btn">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
