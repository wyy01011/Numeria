import React from "react";
import "../styles/dashboard.css"; // Import CSS file

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <img 
        src="/images/dashboard.png" 
        alt="Dashboard" 
        className="dashboard-image" 
      />
    </div>
  );
};

export default Dashboard;
