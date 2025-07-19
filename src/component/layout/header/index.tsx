import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <Link to="/">
            <h3 className="header__logo">TillaPay</h3>
          </Link>

          <nav className={`nav ${isMenuOpen ? "active" : ""}`}>
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink to="/" className="nav__item-link">
                  Products
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/" className="nav__item-link">
                  Solutions
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/" className="nav__item-link">
                  Resources
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink to="/" className="nav__item-link">
                  Contact
                </NavLink>
              </li>
              <li className="nav__item mobile-login">
                <Link to="register" className="header-login">
                  Register
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop Login Button */}
          <Link to="register" className="header-login desktop-login">
            Register
          </Link>

          {/* Burger Menu */}
          <button
            className={`burger ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
