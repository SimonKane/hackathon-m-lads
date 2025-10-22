// ============================================
// AI ANALYSIS SERVICE - Analysera incidenter
// ============================================

// SYFTE:
// Denna fil innehåller logik för att automatiskt analysera incidenter.
// AI:n (i detta fall enkel keyword-matching) avgör typ och prioritet.

// UPPGIFT - STEG 1: Skapa en analysfunktion
// Funktionen ska ta emot title och description från en incident.
// Den ska returnera ett objekt med:
// - type: string (t.ex. "server_down", "high_cpu", "memory_leak")
// - priority: string ("critical", "high", "medium", "low")
// - recommendation: string (förslag på åtgärd)

// UPPGIFT - STEG 2: Implementera keyword-matching
// Skapa en mapping mellan keywords och incident-typer:
// - Om texten innehåller "down", "crashed", "offline" → type: "server_down", priority: "critical"
// - Om texten innehåller "cpu", "slow", "performance" → type: "high_cpu", priority: "high"
// - Om texten innehåller "memory", "leak" → type: "memory_leak", priority: "high"
// - Annars → type: "unknown", priority: "medium"

// UPPGIFT - STEG 3: Ge rekommendationer
// Baserat på typen, returnera en lämplig rekommendation:
// - server_down: "Restart service and check logs"
// - high_cpu: "Scale horizontally or check processes"
// - memory_leak: "Restart service and review recent changes"

// Tips: Gör texten lowercase innan du söker efter keywords
// Tips: Exportera funktionen så den kan användas i controller
