// ============================================
// INCIDENT MODEL - Datastruktur och lagring
// ============================================

// SYFTE:
// Denna fil definierar hur en incident ser ut (interface)
// och hanterar lagring av incidenter (i minnet).

// UPPGIFT - STEG 1: Definiera Incident interface
export interface Incident {
  id: string;
  title: string;
  description: string;
  status: "open" | "investigating" | "resolved" | "closed";
  priority: "critical" | "high" | "medium" | "low";
  createdAt: Date;
  // AI-output kopplat till incidenten
  aiAnalysis?: {
    type?: string;
    priority?: "critical" | "high" | "medium" | "low";
    action?:
      | "restart_service"
      | "scale_up"
      | "clear_cache"
      | "notify_human"
      | "none";
    target?: string;
    recommendation?: string;
  };
  assignedTo?: string;
  history?: Array<{
    timestamp: Date;
    message: string;
  }>;
}
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

// IT Staff - Available employees for incident assignment
export const itStaff = [
  { id: "1", name: "Anna", specialization: "Database & Backend" },
  { id: "2", name: "Johan", specialization: "API & Performance" },
  { id: "3", name: "Lisa", specialization: "Cache & Infrastructure" },
];

export const incidentArray: Incident[] = [
  {
    id: "1",
    title: "Database server unreachable",
    description: "ordersvc-db1 timeout in production region eu-north-1",
    status: "open",
    priority: "critical",
    createdAt: new Date(Date.now() - 1000 * 60 * 10),
    aiAnalysis: {
      type: "server_down",
      priority: "critical",
      action: "restart_service",
      target: "ordersvc-db1",
      recommendation: "Restart ordersvc-db1 and verify healthcheck",
    },
    assignedTo: "Anna",
    history: [
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 9),
        message: "AI klassade som critical",
      },
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 8),
        message: "AutoFix skickade restart request",
      },
    ],
  },
  {
    id: "2",
    title: "High CPU usage on API gateway",
    description: "API-GW running at 95% CPU for 15 minutes",
    status: "investigating",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 20),
    aiAnalysis: {
      type: "high_cpu",
      priority: "high",
      action: "scale_up",
      target: "api-gateway",
      recommendation: "Scale up API-GW to handle more load",
    },
    assignedTo: "Johan",
    history: [
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 19),
        message: "AI rekommenderade scale-up",
      },
    ],
  },
  {
    id: "3",
    title: "Cache memory leak detected",
    description: "Cache process consuming 4GB above normal threshold",
    status: "open",
    priority: "medium",
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    aiAnalysis: {
      type: "memory_leak",
      priority: "medium",
      action: "clear_cache",
      target: "cache-service",
      recommendation: "Clear cache and monitor memory usage",
    },
    assignedTo: "Lisa",
    history: [
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 59),
        message: "AI identifierade memory leak",
      },
    ],
  },
  {
    id: "4",
    title: "Unusual login activity",
    description: "Multiple failed logins detected from unknown IPs",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 1000 * 60 * 5),
    aiAnalysis: {
      type: "security_anomaly",
      priority: "high",
      action: "notify_human",
      target: "auth-service",
      recommendation: "Alert security team for investigation",
    },
    assignedTo: "SecurityTeam",
    history: [
      {
        timestamp: new Date(Date.now() - 1000 * 60 * 4),
        message: "AI flaggade säkerhetsincident",
      },
    ],
  },
];
// UPPGIFT - STEG 3: Skapa CRUD-funktioner
// - getAllIncidents(): Hämta alla incidenter
// - getIncidentById(id): Hämta en specifik incident
// - createIncident(data): Skapa ny incident
// - updateIncident(id, updates): Uppdatera incident
// - deleteIncident(id): Ta bort incident

// Tips: Exportera alla funktioner så de kan användas i controller
