// ============================================
// INCIDENT LIST - Visar alla incidenter
// ============================================

// SYFTE:
// Denna komponent visar en lista med alla incidenter.
// Varje incident ska färgkodas baserat på prioritet.

// UPPGIFT - STEG 1: Ta emot props
// Komponenten ska ta emot:
// - incidents: array av Incident-objekt
// - loading: boolean

// UPPGIFT - STEG 2: Rendera listan
// För varje incident i arrayen:
// - Visa title och description
// - Visa status och priority
// - Visa AI-rekommendation om den finns
// - Färgkoda baserat på priority:
//   * critical: röd
//   * high: orange
//   * medium: gul
//   * low: grön

// UPPGIFT - STEG 3: Hantera edge cases
// - Om loading är true: visa "Laddar incidenter..."
// - Om arrayen är tom: visa "Inga incidenter att visa"

// Tips: Använd array.map() för att rendera listan
// Tips: Glöm inte key-prop på varje list-item (använd incident.id)
// Tips: Använd inline styles eller CSS-klasser för färgkodning
