const express = require("express");
const RunwayML = require("@runwayml/sdk");

const app = express();
app.use(express.json());

const client = new RunwayML();

app.get("/", (req, res) => {
  res.send("AI Video Server is Running!");
});

app.get("/status", (req, res) => {
  res.json({
    status: "online",
    message: "Runway AI Video Server Ready"
  });
});

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    if (!prompt) {
      return res.status(400).json({
        error: "Please provide a video prompt"
      });
    }

    const task = await client.textToVideo.create({
      model: "gen4.5",
      promptText: prompt,
      ratio: "1280:720",
      duration: 5
    }).waitForTaskOutput();

    res.json({
      status: "success",
      video_url: task.output[0]
    });

  } catch (error) {
    console.error("Runway Error:", error);
    res.status(500).json({
      status: "failed",
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
