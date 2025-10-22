# AI-Driven Incident Management System

Ett fullstack TypeScript-projekt för automatisk hantering av IT-incidenter med AI-analys och automatiska åtgärder.

## 📋 Vad är det här projektet?

Detta är ett system där IT-incidenter (t.ex. "servern har kraschat", "hög CPU-användning") kan rapporteras in. Systemet analyserar automatiskt incidenten med AI och föreslår eller utför åtgärder.

**Flöde:**

1. En incident rapporteras med titel och beskrivning
2. Backend tar emot incidenten
3. AI-analys körs (keyword-matching) → avgör typ och prioritet
4. Om incidenten är kritisk → automatisk åtgärd försöker köras
5. Frontend visar alla incidenter med färgkodning

## 🛠️ Installation

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## 🚀 Starta projektet

### Starta backend (Terminal 1)

```bash
cd backend
npm run dev
```

Backend körs nu på `http://localhost:3001`

### Starta frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend körs nu på `http://localhost:5173`

## 📝 Arbetsgång för teamet (8 personer)

Följ denna ordning för att bygga projektet från grunden:

### 🔵 BACKEND (4 personer)

#### Person 1: Model & Datastruktur

**Fil:** `backend/src/models/incident.ts`

1. Definiera `Incident` interface (TypeScript-typ)
2. Skapa en array för att lagra incidenter i minnet
3. Implementera CRUD-funktioner:
   - `getAllIncidents()`
   - `getIncidentById(id)`
   - `createIncident(data)`
   - `updateIncident(id, updates)`
   - `deleteIncident(id)`

#### Person 2: AI-analys

**Fil:** `backend/src/services/aiAnalysis.ts`

1. Skapa en `analyzeIncident()` funktion
2. Implementera keyword-matching:
   - "down", "crashed" → type: "server_down", priority: "critical"
   - "cpu", "slow" → type: "high_cpu", priority: "high"
   - "memory", "leak" → type: "memory_leak", priority: "high"
3. Returnera analysresultat med type, priority och recommendation

#### Person 3: Auto-fix service

**Fil:** `backend/src/services/autoFix.ts`

1. Skapa en `attemptFix()` funktion
2. Baserat på incident-typ, simulera åtgärder:
   - server_down → "Server restart initiated"
   - high_cpu → "Scaled up to 3 instances"
   - memory_leak → "Memory cache cleared"
3. Returnera objekt med action, success och message

#### Person 4: Controller & Routes

**Filer:** `backend/src/controllers/incidentController.ts` och `backend/src/routes/incidents.ts`

**A) Controller först:**

1. Skapa handler-funktioner för varje operation
2. Implementera `createIncidentHandler` (viktigast!):
   - Ta emot title och description
   - Anropa AI-analys
   - Skapa incident med analys
   - Om critical → kör auto-fix
   - Returnera skapad incident
3. Lägg till felhantering med try-catch

**B) Routes sedan:**

1. Skapa Express Router
2. Definiera endpoints:
   - `GET /` → alla incidenter
   - `POST /` → skapa incident
   - `GET /:id` → hämta en incident
   - `PATCH /:id` → uppdatera incident
   - `DELETE /:id` → ta bort incident

#### Person (alla 4): Server setup

**Fil:** `backend/src/index.ts`

1. Sätt upp Express server
2. Lägg till middleware (cors, express.json)
3. Montera routes på `/api/incidents`
4. Starta server på port 3001

### 🟢 FRONTEND (4 personer)

#### Person 5: TypeScript types

**Fil:** `frontend/src/types/Incident.ts`

1. Definiera `Incident` interface (ska matcha backend!)
2. Inkludera alla fält: id, title, description, status, priority, createdAt, aiAnalysis

#### Person 6: App-komponenten (data-hantering)

**Fil:** `frontend/src/App.tsx`

1. Skapa state för incidents, loading och error
2. Använd useEffect för att hämta data från backend
3. Fetch från `http://localhost:3001/api/incidents`
4. Filtrera ut kritiska incidenter
5. Rendera NotificationBanner och IncidentList

#### Person 7: IncidentList-komponenten

**Fil:** `frontend/src/components/IncidentList.tsx`

1. Ta emot incidents och loading som props
2. Loopa över incidents med .map()
3. Visa varje incident med title, description, status och priority
4. Färgkoda baserat på priority (critical=röd, high=orange, etc.)
5. Visa AI-rekommendation om den finns
6. Hantera loading-state och tom lista

#### Person 8: NotificationBanner-komponenten

**Fil:** `frontend/src/components/NotificationBanner.tsx`

1. Ta emot criticalIncidents som props
2. Om det finns kritiska incidenter:
   - Visa röd varningsbanner
   - Visa antal kritiska incidenter
   - Lista deras titlar
3. Om inga: visa grön "Alla system OK" eller inget alls

#### Person (alla 4): Main entry point

**Fil:** `frontend/src/main.tsx`

1. Importera React, ReactDOM och App
2. Använd `ReactDOM.createRoot()` för att rendera App till `#root`

## 🧠 AI-flödet (hur systemet fungerar)

```
1. Incident skapas (POST /api/incidents)
   ↓
2. Backend tar emot title och description
   ↓
3. AI-analys körs (aiAnalysis.ts)
   → Matchar keywords i texten
   → Avgör type: "server_down", "high_cpu", etc.
   → Avgör priority: "critical", "high", "medium", "low"
   → Ger recommendation: "Restart service and check logs"
   ↓
4. Incident skapas i databasen (model) med AI-resultat
   ↓
5. OM priority är "critical":
   → Auto-fix körs (autoFix.ts)
   → Simulerar åtgärd (t.ex. restart)
   → Sparar åtgärdsresultat
   ↓
6. Incident returneras till frontend
   ↓
7. Frontend visar incidenten färgkodad
```

## 📦 Projektstruktur

```
start-projekt/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express server
│   │   ├── models/
│   │   │   └── incident.ts       # Datamodell & CRUD
│   │   ├── services/
│   │   │   ├── aiAnalysis.ts     # AI-analys (keyword-matching)
│   │   │   └── autoFix.ts        # Automatiska åtgärder
│   │   ├── controllers/
│   │   │   └── incidentController.ts  # Affärslogik
│   │   └── routes/
│   │       └── incidents.ts      # API endpoints
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── main.tsx              # React entry point
│   │   ├── App.tsx               # Root-komponent
│   │   ├── types/
│   │   │   └── Incident.ts       # TypeScript types
│   │   └── components/
│   │       ├── IncidentList.tsx       # Lista incidenter
│   │       └── NotificationBanner.tsx # Kritiska alerts
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
└── README.md
```

## 🧪 Testa att allt fungerar

### 1. Testa backend med curl

```bash
# Hämta alla incidenter (ska vara tom första gången)
curl http://localhost:3001/api/incidents

# Skapa en kritisk incident
curl -X POST http://localhost:3001/api/incidents \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Production Server Down",
    "description": "Main server has crashed and is offline"
  }'

# Hämta igen - nu ska den nya incidenten finnas
curl http://localhost:3001/api/incidents
```

### 2. Testa frontend

1. Öppna `http://localhost:5173` i webbläsaren
2. Du ska se en lista med incidenter (eller "Inga incidenter" om tom)
3. Skapa en incident med curl (se ovan)
4. Ladda om sidan - incidenten ska dyka upp
5. Om incidenten är critical ska en röd banner visas högst upp

## 💡 Tips för utveckling

- **Börja med backend** - frontend behöver ett API att prata med
- **Testa varje del för sig** - använd curl för att testa backend innan ni bygger frontend
- **Kommunicera!** - Person 1-4 (backend) och 5-8 (frontend) behöver synka interfaces
- **Använd console.log()** - logga ofta för att debugga
- **Kolla TypeScript-fel** - de hjälper er hitta buggar tidigt

## 🔧 Vanliga problem

**Problem:** Backend startar inte

- **Lösning:** Kolla att `npm install` körts i backend-mappen

**Problem:** Frontend kan inte hämta data

- **Lösning:** Kolla att backend körs på port 3001 först

**Problem:** TypeScript-fel

- **Lösning:** Kolla att alla typer matchar mellan frontend och backend

**Problem:** CORS-fel

- **Lösning:** Se till att cors() middleware är aktiverad i backend/src/index.ts

## 🎯 Nästa steg efter grundimplementation

1. Lägg till styling (CSS) för att göra UI:t snyggare
2. Lägg till möjlighet att uppdatera status på incidenter
3. Lägg till filter för att visa bara vissa typer/prioriteter
4. Lägg till polling så frontend uppdateras automatiskt
5. Ersätt in-memory lagring med en riktig databas (t.ex. PostgreSQL)
6. Förbättra AI-analysen (använd riktig ML istället för keywords)

**Lycka till med byggandet!** 🚀
