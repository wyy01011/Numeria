import React from "react";
import { Link } from "react-router-dom";
import "./../styles/home.css";

const Home = () => {
  return (
    <div className="homeContainer">
      {/* Welcome Back Text */}
      <div className="welcomeBack">
        <p>Welcome back, Mathilda!</p>
      </div>

      {/* Main Content */}
      <div className="contentWrapper">
        <div className="containerHomeText">
          <p className="title">
            WELCOME TO <br />
            <span className="numeria">NUMERIA</span>
          </p>
          <p className="subtitle">Find your treasure!</p>

          {/* Buttons */}
          <div className="buttons">
            <Link to="/avatar">
              <button>play</button>
            </Link>
            <Link to="/dashboard">
              <button>my stats</button>
            </Link>
          </div>
        </div>

        {/* Animal Image */}
        <div className="homeAnimalsContainer">
          <img src="/images/homeAnimals.png" alt="Homepage art" />
        </div>
      </div>
    </div>
  );
};

export default Home;
