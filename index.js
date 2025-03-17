const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./src/config/db");
const app = express();
// Import routes
const authRoutes = require("./src/routes/auth");
const websiteRoutes = require("./src/routes/website");
const { errorHandler } = require("./src/middleware/errorHandler");

// Enable CORS for all routes
app.use(cors());

// Alternatively, configure CORS for specific origins
// app.use(cors({
//   origin: 'http://localhost:3000', // Allow requests from your Next.js frontend
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
//   credentials: true, // Allow cookies and credentials
// }));

app.use(express.json());
dotenv.config();
connectDB();

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/website", websiteRoutes);

// middleware handling error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
