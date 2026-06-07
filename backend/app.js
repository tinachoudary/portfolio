const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.get("/", (req, res) => {
  res.send("Backend Server Running");
});
let resumeText = "";

async function loadResume() {

  const dataBuffer = fs.readFileSync(
    "./data/resume.pdf"
  );

  const data = await pdfParse(dataBuffer);

  resumeText = data.text;

  console.log("Resume loaded");
}

loadResume();
let localRequestCount = 0;

app.post("/chat", async (req, res) => {
  localRequestCount++;
  console.log(`>>> Backend received request #${localRequestCount} right now!`);

  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: `
You are an AI assistant for Abhishek's portfolio website.

IMPORTANT RULES:
- Answer ONLY using the resume context provided
- Do NOT invent information
- If answer is not found in resume, say:
"I don't have information about that yet."

Resume Context:
${resumeText}

User Question:
${question}
`,
    });

    // Reset counter on success
    localRequestCount = 0; 
    return res.json({ answer: response.text});

  } catch (error) {
    console.error("--- RAW GOOGLE ERROR ---", error.message || error);
    
    return res.status(429).json({
      error: "Rate limit caught",
      localCount: localRequestCount
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});