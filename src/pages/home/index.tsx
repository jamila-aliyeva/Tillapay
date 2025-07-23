import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import HeroBackgroundImage from "../../assets/image/home-bg.jpg";

const Homepage: React.FC = () => {
  const backgroundStyle: React.CSSProperties = {
    height: 688,
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundImage: `linear-gradient(#0F172A, rgba(47, 45, 36, 0.82)), url(${HeroBackgroundImage})`,
    color: "#ffff",
  };

  return (
    <section className="hero" style={backgroundStyle}>
      <div className="container">
        <div className="hero__content">
          <h2 className="hero__content-title">
            WELCOME TO TILLAPAY MANAGE YOUR MONEY SMARTLY PAYMENTS. BALANCE.
            SECURITY.
          </h2>
          <p className="hero__content-description">
            Easily top up your balance, manage your payments, and simplify your
            financial life with TillaPay.
          </p>
          <Link className="hero-shop-now" to="/payment">
            payment
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
