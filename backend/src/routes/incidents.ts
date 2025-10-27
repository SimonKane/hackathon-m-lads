// ============================================
// INCIDENT ROUTES - API endpoints
// ============================================

// SYFTE:
// Denna fil definierar alla HTTP-endpoints för incidenter.
// Den kopplar URL:er till controller-funktioner.

// UPPGIFT - STEG 1: Skapa en Express Router
// Importera Router från express och skapa en ny router-instans.
import express from "express";
import {
  simulateIncidentHandler,
  updateIncidentStatusHandler,
  createIncidentHandler,
  getAllIncidentsHandler,
} from "../controllers/incidentController";

const router = express.Router();

// UPPGIFT - STEG 2: Definiera endpoints
// Koppla varje endpoint till rätt handler från controller:
// - GET    /           → getAllIncidentsHandler
router.get("/incidents", getAllIncidentsHandler);

// - POST   /           → createIncidentHandler
router.post("/incidents", createIncidentHandler);
// - PATCH  /:id        → updateIncidentStatusHandler
router.patch("/incidents/:id/status", updateIncidentStatusHandler);
// - DELETE /:id        → deleteIncidentHandler
// router.delete("/incidents/:id", (req, res) => {
//   res.send("Delete Incident Works");
// });

//Skicka in en fejkad incident för demo
router.get("/simulate", simulateIncidentHandler);

// UPPGIFT - STEG 3: Exportera routern
// Exportera routern som default så den kan användas i index.ts
export default router;

// Tips: Använd router.get(), router.post(), etc.
// Tips: Parametern :id i URL:en blir tillgänglig via req.params.id
