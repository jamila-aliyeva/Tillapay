import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./index.css";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

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
                <NavLink
                  to="/convertation"
                  className={({ isActive }) =>
                    `nav__item-link ${isActive ? "active" : ""}`
                  }
                >
                  Purchase
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/convertationlist"
                  className={({ isActive }) =>
                    `nav__item-link ${isActive ? "active" : ""}`
                  }
                >
                  Convertation
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/currency"
                  className={({ isActive }) =>
                    `nav__item-link ${isActive ? "active" : ""}`
                  }
                >
                  Currency
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/transactions"
                  className={({ isActive }) =>
                    `nav__item-link ${isActive ? "active" : ""}`
                  }
                >
                  Transactions
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav__item-link ${isActive ? "active" : ""}`
                  }
                >
                  Contact
                </NavLink>
              </li>

              {/* Mobile login/register (visible only on mobile) */}
              <li className="nav__item mobile-login">
                {isAuthenticated ? (
                  <Link to="/profile" className="header-login">
                    Profile
                  </Link>
                ) : (
                  <Link to="/register" className="header-login">
                    Register
                  </Link>
                )}
              </li>
            </ul>
          </nav>

          {/* Desktop login/register (visible only on desktop) */}
          <div className="desktop-login">
            {isAuthenticated ? (
              <Link to="/profile" className="header-login">
                Profile
              </Link>
            ) : (
              <Link to="/register" className="header-login">
                Register
              </Link>
            )}
          </div>

          {/* Burger menu */}
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
