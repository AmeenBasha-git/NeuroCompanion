const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json())

app.use("/api", userRoutes);

app.listen(process.env.PORT, () => {
    console.log("App is running at Port", process.env.PORT);
})