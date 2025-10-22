// ============================================
// INCIDENT ROUTES - API endpoints
// ============================================

// SYFTE:
// Denna fil definierar alla HTTP-endpoints för incidenter.
// Den kopplar URL:er till controller-funktioner.

// UPPGIFT - STEG 1: Skapa en Express Router
// Importera Router från express och skapa en ny router-instans.

// UPPGIFT - STEG 2: Definiera endpoints
// Koppla varje endpoint till rätt handler från controller:
// - GET    /           → getAllIncidentsHandler
// - GET    /:id        → getIncidentByIdHandler
// - POST   /           → createIncidentHandler
// - PATCH  /:id        → updateIncidentHandler
// - DELETE /:id        → deleteIncidentHandler

// UPPGIFT - STEG 3: Exportera routern
// Exportera routern som default så den kan användas i index.ts

// Tips: Använd router.get(), router.post(), etc.
// Tips: Parametern :id i URL:en blir tillgänglig via req.params.id
