// import express from "express";
// import axios from "axios";

// const app = express();

// app.use(function(req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', '*'); //หรือใส่แค่เฉพาะ domain ที่ต้องการได้
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

// app.get("/3Hour", async (req, res) => {
//   const { FilterText, Culture } = req.query;
  
//   try {
//     const response = await axios.get(
//       `https://www.tmd.go.th/api/Weather3Hour/weather-3hour-province`, {
//         params: {
//           FilterText: FilterText,
//           Culture: Culture
//         }
//       }
//     );
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//     res.status(500).send("Error fetching data from API");
//   }
// });

// app.get("/7Day", async (req, res) => {
//   const { FilterText, Culture } = req.query;
  
//   try {
//     const response = await axios.get(
//       `https://www.tmd.go.th/api/WeatherForecast7Day/weather-forecast-7day-by-province`, {
//         params: {
//           Sorting: 'weatherForecast7Day.recordTime asc',
//           FilterText: FilterText,
//           MaxResultCount: 7,
//           Culture: Culture,
//         },
//       }
//     );
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching data from API:", error);
//     res.status(500).send("Error fetching data from API");
//   }
// });

// app.get("/getAQI", async (req, res) => {
//   try {
//     const response = await axios.get("http://air4thai.com/forweb/getAQI_JSON.php");
//     console.log(response.data);
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching data from API:", error.message);
//     res.status(500).send("Error fetching data from API");
//   }
// });

// const PORT = 4000;
// app.listen(PORT, () =>
//   console.log(`Server started on port: 'http://localhost:${PORT}'`)
// );


// // const PORT = 4000;
// // const HOST = '172.27.173.43';

// // app.listen(PORT, HOST, () =>
// //   console.log(`Server started on: https://${HOST}:${PORT}`)
// // );



import express from "express";
import axios from "axios";
import https from "https";
import fs from "fs";

const app = express();

// Middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Route to fetch 3-hour weather data
app.get("/3Hour", async (req, res) => {
  const { FilterText, Culture } = req.query;

  try {
    const response = await axios.get(
      `https://www.tmd.go.th/api/Weather3Hour/weather-3hour-province`,
      {
        params: { FilterText, Culture },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).send("Error fetching data from API");
  }
});

// Route to fetch 7-day weather forecast
app.get("/7Day", async (req, res) => {
  const { FilterText, Culture } = req.query;

  try {
    const response = await axios.get(
      `https://www.tmd.go.th/api/WeatherForecast7Day/weather-forecast-7day-by-province`,
      {
        params: {
          Sorting: "weatherForecast7Day.recordTime asc",
          FilterText,
          MaxResultCount: 7,
          Culture,
        },
      }
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).send("Error fetching data from API");
  }
});

// Route to fetch AQI data
app.get("/getAQI", async (req, res) => {
  try {
    const response = await axios.get("http://air4thai.com/forweb/getAQI_JSON.php");
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from API:", error.message);
    res.status(500).send("Error fetching data from API");
  }
});

const PORT = 3000;
// const HOST = "172.27.173.43";

const options = {
  key: fs.readFileSync("./cert/cert.key"),
  cert: fs.readFileSync("./cert/cert.crt"),
};

https.createServer(options, app).listen(PORT, () => {
  // console.log(`HTTPS Server running at https://${HOST}:${PORT}`);
});
