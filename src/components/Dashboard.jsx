import React, { useEffect, useState } from "react";


const Dashboard = () => {
  const [teamData, setTeamData] = useState([]); // State to hold the team data
  const [showCompanyInfo, setShowCompanyInfo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/ipl-teams'); // API endpoint
        const data = await response.json(); // Parse the JSON response
        setTeamData(data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching IPL team names:', error);
      }
    };

    fetchData(); // Call the fetchData function
  }, []); // Empty dependency array ensures it runs once on component mount

  const toggleCompanyInfo = () => {
    setShowCompanyInfo(!showCompanyInfo);
  };

  return (
    <div>
      <h2>Welcome to the Dashboard! Here is the data fetched from the API</h2>
      {teamData.length > 0 ? ( // Check if teamData has data
        teamData.map((element, index) => (
          <div key={index}>
            {element.name}, {element.detail1}, {element.detail2}
          </div>
        ))
      ) : (
        <p>No teams found</p> // Improved empty state message
      )}

      <button 
        onClick={toggleCompanyInfo} 
        style={{ marginTop: '20px', padding: '10px', cursor: 'pointer' }} 
        aria-label="Toggle Company Info"
      >
        Company Info
      </button>

      {/* Conditionally rendering company info */}
      {showCompanyInfo && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Company Info</h3>
          <p><strong>Company:</strong> Geeksynergy Technologies Pvt Ltd</p>
          <p><strong>Address:</strong> Sanjayanagar, Bengaluru-56</p>
          <p><strong>Phone:</strong> XXXXXXXXX09</p>
          <p><strong>Email:</strong> XXXXXX@gmail.com</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
