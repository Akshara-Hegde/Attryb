const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connect = require("./DBConnection/connection");
const dotenv = require("dotenv").config();

connect();

app.use(express.json());
app.use("/api/admin", require("./routes/adminAuthRoutes"));
app.use("/api/user", require("./routes/userAuthRoutes"));
app.use("/api/car", require("./routes/carroutes"));

app.listen(PORT, () => {
  console.log("connected to server");
});
