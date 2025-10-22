// ============================================
// NOTIFICATION BANNER - Visar kritiska alerts
// ============================================

// SYFTE:
// Denna komponent visar en varningsbanner för kritiska incidenter.
// Den ska synas högst upp på sidan och dra uppmärksamhet.

// UPPGIFT - STEG 1: Ta emot props
// Komponenten ska ta emot:
// - criticalIncidents: array med incidenter som har priority "critical"

// UPPGIFT - STEG 2: Rendera banner
// Om det finns kritiska incidenter:
// - Visa antal kritiska incidenter
// - Visa en röd/orange varningsbanner
// - Lista de kritiska incidenternas titlar
// - Gör bannern visuellt framträdande (stor text, färg, ikon)

// UPPGIFT - STEG 3: Hantera edge case
// Om inga kritiska incidenter finns:
// - Visa en grön banner med "Alla system OK" eller
// - Visa ingenting alls

// Tips: Använd conditional rendering med &&
// Tips: Använd CSS för att sticka ut bannern (position: sticky?)
// Tips: Lägg till emoji eller ikoner för att göra det tydligare
