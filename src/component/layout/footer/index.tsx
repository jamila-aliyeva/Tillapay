import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";
// import {
//   Facebook,
//   Instagram,
//   LinkedIn,
//   Telegram,
//   Twitter,
// } from "../../../Assets/Images/Png";
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

// const socialIcons = [
//   { src: Facebook, alt: "Facebook" },
//   { src: Twitter, alt: "Twitter" },
//   { src: Instagram, alt: "Instagram" },
//   { src: LinkedIn, alt: "LinkedIn" },
//   { src: Telegram, alt: "Telegram" },
// ];

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__container">
          <ul className="footer__list">
            {footerLinks.map((section, index) => (
              <li className="footer__item" key={index}>
                <h2 className="footer__item-title">{section.title}</h2>
                <hr className="footer-horizontal-rule" />

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

        <hr className="footer-horizontal-rule" />

        <ul className="footer__medias">
          {/* {socialIcons.map((icon, index) => (
            <li key={index}>
              <a href="#" target="_blank" rel="noreferrer">
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="footer__media-image"
                />
              </a>
            </li>
          ))} */}
        </ul>
        <hr className="footer-horizontal-rule " />
      </div>
    </footer>
  );
};

export default Footer;
