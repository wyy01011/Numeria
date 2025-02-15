
import React from "react";
import { Link } from "react-router-dom";
import "./../styles/home.css";


const Home = () => {
  return (
    <><div className="container">

        {<p className="title">
        WELCOME TO <br />
        <span className="numeria">NUMERIA</span>
        </p>}

        <p className="subtitle">Find your treasure!</p>
    </div>
  
      
      <div className="buttons">

            <Link to="/level">
                <button>play</button>
            </Link>

            <Link to="/dashboard">
                <button>stats</button>
            </Link>

        </div>

        <span className="homeAnimalsContainer">

            <img src = "/images/homeAnimals.png" alt = "Homepage art"></img>

        </span>
        
        </>
   
  );
};

export default Home;
