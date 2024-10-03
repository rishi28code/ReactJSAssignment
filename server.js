const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://hoblist.com/list/swathi/sports-and-fitness/the-best-indian-premier-league-ipl-team';

// Function to fetch IPL team names
async function fetchIPLTeamNames() {
  const teamData = []; // Declare teamData array
  try {
    // Fetch the HTML from the URL
    const { data } = await axios.get(url);
    
    // Load the HTML into cheerio
    const $ = cheerio.load(data);

    // Extracting team names
    $('#__next > div.jss6 > main > div.MuiContainer-root.jss136.MuiContainer-maxWidthLg > div > div.MuiGrid-root.MuiGrid-container.MuiGrid-item.MuiGrid-justify-content-xs-center.MuiGrid-grid-xs-12.MuiGrid-grid-sm-12.MuiGrid-grid-md-9.MuiGrid-grid-lg-9.MuiGrid-grid-xl-9 > div:nth-child(4) > div').each((index, element) => {
      const teamName = $(element).find('div[class="css-10y8zan"]').text().trim();
      const detail1 = $(element).find('div > div > div > div').text().trim();
      const detail2 = $(element).find('div > div > div > div:nth-child(2)').text().trim();

      // Push an object instead of an array for better readability
      teamData.push({ name: teamName, detail1, detail2 });
    });

    return teamData; // Return the array
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of error
  }
}

// Create an Express server
const app = express();
const PORT = 5000;

// Enable CORS to allow requests from the frontend
app.use(cors());

// API route to fetch IPL teams
app.get('/api/ipl-teams', async (req, res) => {
  try {
    const teams = await fetchIPLTeamNames();  // Fetch the team names
    res.json(teams);  // Send the team names as a JSON response
  } catch (error) {
    console.error('Error fetching IPL teams:', error);
    res.status(500).json({ message: 'Error fetching IPL teams' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
