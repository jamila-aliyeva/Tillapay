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
          <h3 className="hero__content-welcome">Welcome to KIRA</h3>
          <h2 className="hero__content-title">
            One Journey Every Voice Every Destination
          </h2>
          <p className="hero__content-description">
            We are an online plant shop offering a wide range of cheap and
            trendy plants. Use our plants to create a unique Urban Jungle. Order
            your favorite plants!
          </p>
          <Link className="hero-shop-now" to="/">
            show now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
