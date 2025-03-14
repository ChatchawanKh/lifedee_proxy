// api/3Hour.js
import axios from "axios";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { FilterText, Culture } = req.query;

  try {
    const response = await axios.get(
      "https://www.tmd.go.th/api/Weather3Hour/weather-3hour-province",
      {
        params: { FilterText, Culture },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

// api/7Day.js
import axios from "axios";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { FilterText, Culture } = req.query;

  try {
    const response = await axios.get(
      "https://www.tmd.go.th/api/WeatherForecast7Day/weather-forecast-7day-by-province",
      {
        params: {
          Sorting: "weatherForecast7Day.recordTime asc",
          FilterText,
          MaxResultCount: 7,
          Culture,
        },
      }
    );
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}

// api/getAQI.js
import axios from "axios";

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const response = await axios.get("http://air4thai.com/forweb/getAQI_JSON.php");
    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
}