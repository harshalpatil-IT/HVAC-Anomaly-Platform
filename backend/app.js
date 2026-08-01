const express = require("express");
const cors = require("cors");

require("./config/db");

const deviceRoutes = require("./routes/deviceRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/devices", deviceRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("HVAC Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});