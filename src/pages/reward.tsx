import React from "react";
import { motion } from "framer-motion";
import "./../styles/reward.css";

const Reward = () => {
  return (
    <div className="rewardContainer">
      <motion.div 
        className="youGotContainer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
      >
        <p className="youGot">You Got</p>
      </motion.div>
      
      <div className="poutinePic">
        <img src="./images/poutine.png" alt="Poutine" width="250" height="250"/>
      </div>

      <motion.div className="poutine"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}>
        <p>POUTINE!!</p>
      </motion.div>
    </div>
  );
};

export default Reward;
