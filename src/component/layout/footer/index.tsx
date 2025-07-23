import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
const footerLinks = [
  {
    title: "компания",
    links: ["Leadership", "Our History"],
  },
  {
    title: "продукты",
    links: ["Загрузочная доска", "Тарифы на фрахт"],
  },
  {
    title: "ресурсы",
    links: ["Вопросы и ответы", "Пресс-центр"],
  },
  {
    title: "поддержка",
    links: ["Вход в систему продукта", "Защита от мошенничества"],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <ul className="footer__list">
            {footerLinks.map((section, index) => (
              <li className="footer__item" key={index}>
                <h2 className="footer__item-title">{section.title}</h2>

                <ul className="footer__navigations">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <NavLink to="/" className="footer__navigation-link">
                        {link}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <ul className="footer__medias">
          <li className="footer__media-image">
            <a href="insagram.com">
              <FaInstagram />
            </a>
          </li>
          <li className="footer__media-image">
            <a href="insagram.com">
              <FaLinkedin />
            </a>
          </li>
          <li className="footer__media-image">
            <a href="insagram.com">
              <FaTelegram />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
