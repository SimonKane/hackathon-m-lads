// ============================================
// INCIDENT MODEL - Datastruktur och lagring
// ============================================

// SYFTE:
// Denna fil definierar hur en incident ser ut (interface)
// och hanterar lagring av incidenter (i minnet).

// UPPGIFT - STEG 1: Definiera Incident interface
// Skapa ett TypeScript interface som beskriver en incident:
// - id: string
// - title: string
// - description: string
// - status: 'open' | 'investigating' | 'resolved' | 'closed'
// - priority: 'critical' | 'high' | 'medium' | 'low'
// - createdAt: Date
// - aiAnalysis?: { type: string, priority: string, recommendation: string }

// UPPGIFT - STEG 2: Skapa en array för att lagra incidenter
// Detta är en enkel in-memory databas (datan försvinner vid omstart)

// UPPGIFT - STEG 3: Skapa CRUD-funktioner
// - getAllIncidents(): Hämta alla incidenter
// - getIncidentById(id): Hämta en specifik incident
// - createIncident(data): Skapa ny incident
// - updateIncident(id, updates): Uppdatera incident
// - deleteIncident(id): Ta bort incident

// Tips: Exportera alla funktioner så de kan användas i controller
