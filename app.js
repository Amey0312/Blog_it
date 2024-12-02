const express = require("express");
const path = require("path");
const connectDB = require("./backend/config/db");
require("dotenv").config();
const cors = require("cors");
const app = express();

// Allow requests from the frontend's origin
app.use(cors({ origin: "http://localhost:3000" })); // Replace 3000 with your frontend port


// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
const blogRoutes = require("./backend/routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend/dist/index.html"));
	});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
