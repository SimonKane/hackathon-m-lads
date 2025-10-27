// ============================================
// BACKEND SERVER - Express setup
// ============================================

// SYFTE:
// Detta är huvudfilen för backend-servern.
// Här ska ni sätta upp Express, middleware och starta servern.
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log(`Server is listening to ${PORT}`);
});

// UPPGIFT:
// 1. Importera express, cors och dotenv
// 2. Skapa en Express-app
// 3. Lägg till middleware:
//    - cors() för att tillåta requests från frontend
//    - express.json() för att parsa JSON
// 4. Importera och använd routes från ./routes/incidents
// 5. Starta servern på port 3001 (eller från miljövariabel)
// 6. Logga ett meddelande när servern startat

// Tips: Använd app.listen() för att starta servern
// Tips: Använd app.use() för att lägga till middleware och routes
