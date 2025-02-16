import React from "react";
import { Link } from "react-router-dom";
import "./../styles/avatar.css";

const Avatar = () => {
  return (
    <>
      <h1 className="titleAvatar">CHOOSE YOUR AVATAR</h1>

      <Link to ="/"><img src = "images/setting.png" alt="setting" className="settingButton"></img></Link>

      <div className="pageContainer">
        <div className="giraffeContainer">
            <Link to ="/"><img src="images/giraffe.png" alt="giraffe" className="avatarImage" /></Link>
          
            <button className="avatarButton"><Link to="/"> tanzanian <br /> giraffe</Link></button>
          
        </div>
        
        <div className="mooseContainer">
            <Link to="/level"><img src="images/moose.png" alt="moose" className="avatarImage" /></Link>
          
            <button className="avatarButton"><Link to="/question"> canadian <br /></Link> moose</button>
          
        </div>

        <div className="racoonContainer">
            <Link to="/"><img src="images/racoon.png" alt="racoon" className="avatarImage" /></Link>
          
            <button className="avatarButton"><Link to="/"> japanese <br /> racoon</Link></button>
          
        </div>

        
      </div>
    </>
  );
};

export default Avatar;
