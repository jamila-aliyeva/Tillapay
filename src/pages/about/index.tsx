import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

const About: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="about">
      <div className="about__container">
        <h2 className="about__title" data-aos="fade-up">
          About <span>TillaPay</span>
        </h2>

        <p className="about__intro" data-aos="fade-up" data-aos-delay="100">
          TillaPay is a modern gold exchange platform that allows users to buy,
          sell, and convert gold securely and instantly. We blend tradition with
          technology, making investment in gold easier than ever.
        </p>

        <div className="about__features">
          <div className="feature" data-aos="fade-up" data-aos-delay="200">
            <h3>🛡️ Secure Transactions</h3>
            <p>
              We ensure every transaction is encrypted, verified, and secure —
              your gold is safe with us.
            </p>
          </div>
          <div className="feature" data-aos="fade-up" data-aos-delay="300">
            <h3>⚡ Instant Conversion</h3>
            <p>
              Real-time conversion between Gold and Uzbek So'm based on current
              market rates.
            </p>
          </div>
          <div className="feature" data-aos="fade-up" data-aos-delay="400">
            <h3>📱 Easy to Use</h3>
            <p>
              Our platform is designed for simplicity, speed, and full mobile
              accessibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
