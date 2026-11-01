const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Video Server is Running!");
});

app.get("/status", (req, res) => {
  res.json({
    status: "online",
    message: "AI Video Server Ready"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
