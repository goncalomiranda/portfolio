const express = require("express");
const path = require("path");
const indexRouter = require("./routes/index");

const app = express();
const port = 3000;

// Set view engine to EJS
app.set("view engine", "ejs");

// Define the views directory
app.set("views", path.join(__dirname, "views"));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
