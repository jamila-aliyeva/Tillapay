import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import HeroBackgroundImage from "../../assets/image/home-bg.jpg";

import About from "../about";

const Homepage: React.FC = () => {
  const backgroundStyle: React.CSSProperties = {
    height: 688,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `linear-gradient(#0F172A, rgba(47, 45, 36, 0.82)), url(${HeroBackgroundImage})`,
    color: "#ffff",
  };

  const token = localStorage.getItem("token"); // 👈 foydalanuvchi kirganmi?

  return (
    <>
      <section className="hero" style={backgroundStyle}>
        <div className="container">
          <div className="hero__content">
            <h2 className="hero__content-title fade-up">
              WELCOME TO TILLAPAY MANAGE YOUR MONEY SMARTLY PAYMENTS. BALANCE.
              SECURITY.
            </h2>
            <p className="hero__content-description">
              Easily top up your balance, manage your payments, and simplify
              your financial life with TillaPay.
            </p>

            {token ? (
              <Link className="hero-shop-now fade-up" to="/profile">
                Profile
              </Link>
            ) : (
              <Link className="hero-shop-now fade-up" to="/register">
                Register
              </Link>
            )}
          </div>
        </div>
      </section>
      <About />
    </>
  );
};

export default Homepage;
