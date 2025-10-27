// ============================================
// INCIDENT CONTROLLER - Affärslogik för incidenter
// ============================================

// SYFTE:
// Denna fil innehåller affärslogiken för att hantera incidenter.
// Den kopplar ihop modeller, services och routes.
import { type Incident, incidentArray } from "../models/incident";
import { Request, Response } from "express";

// UPPGIFT - STEG 1: Skapa handler-funktioner
// Varje funktion ska hantera en specifik operation:
// - getAllIncidentsHandler: Hämta alla incidenter från model

export async function getAllIncidentsHandler(req: Request, res: Response) {
  try {
    const result: Incident[] = incidentArray;
    if (incidentArray.length === 0) {
      return res.status(400).json({ message: "No incidents" });
    }
    res.status(200).json({ incidents: result });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
// - getIncidentByIdHandler: Hämta en specifik incident

export async function getIncidentByIdHandler(req: Request, res: Response) {
  const { id } = req.params;
  try {
    let result = incidentArray.find((incident) => incident.id === id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "No incidident with that id found" });
    }

    res.status(200).json({ incident: result });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
// - createIncidentHandler: Skapa ny incident + kör AI-analys + auto-fix
// - updateIncidentHandler: Uppdatera befintlig incident
// - deleteIncidentHandler: Ta bort incident

// UPPGIFT - STEG 2: Implementera create-flödet
// Detta är det viktigaste! När en incident skapas:
// 1. Ta emot title och description från request body
// 2. Anropa aiAnalysis för att analysera incidenten
// 3. Skapa incidenten i modellen (med AI-resultat)
// 4. Om priority är "critical" → anropa autoFix
// 5. Returnera den skapade incidenten till klienten

// UPPGIFT - STEG 3: Felhantering
// Alla handlers ska ha try-catch för att fånga fel.
// Returnera lämpliga HTTP-statuskoder:
// - 200 för lyckad GET/UPDATE/DELETE
// - 201 för lyckad CREATE
// - 404 om resursen inte hittas
// - 500 för serverfel

// Tips: Använd Express Request och Response typer
// Tips: Exportera alla handler-funktioner
