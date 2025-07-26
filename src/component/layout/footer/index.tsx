import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";

const footerLinks = [
  {
    title: "Company",
    links: ["About Us", "Our Mission", "Careers"],
  },
  {
    title: "Services",
    links: ["Buy Gold", "Sell Gold", "Exchange Rates"],
  },
  {
    title: "Resources",
    links: ["FAQ", "Blog", "Security Tips"],
  },
  {
    title: "Support",
    links: ["Contact Us", "Terms of Service", "Privacy Policy"],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {footerLinks.map((section, index) => (
            <div className="footer__column" key={index}>
              <h2 className="footer__title">{section.title}</h2>
              <ul className="footer__links">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <NavLink to="/" className="footer__link">
                      {link}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <ul className="footer__socials">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a href="https://t.me" target="_blank" rel="noreferrer">
                <FaTelegram />
              </a>
            </li>
          </ul>
          <p className="footer__copyright">
            © {new Date().getFullYear()} TillaPay.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
