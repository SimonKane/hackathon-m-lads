// ============================================
// AI ANALYSIS SERVICE - Analysera incidenter
// ============================================

// SYFTE:
// Denna fil innehåller logik för att automatiskt analysera incidenter.
// AI:n (i detta fall enkel keyword-matching) avgör typ och prioritet.
import OpenAI from "openai";
// UPPGIFT - STEG 1: Skapa en analysfunktion

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function analyzeIncident(title: string, description: string) {
  // Funktionen ska ta emot title och description från en incident.
  // Den ska returnera ett objekt med:
  // - type: string (t.ex. "server_down", "high_cpu", "memory_leak")
  // - priority: string ("critical", "high", "medium", "low")
  // - recommendation: string (förslag på åtgärd)

  const prompt = `
Du är en AI som analyserar IT-incidenter.
Läs texten nedan och svara i strikt JSON-format med följande fält:
{
  "type": "server_down" | "high_cpu" | "memory_leak" | "network_issue" | "unknown",
  "priority": "critical" | "high" | "medium" | "low",
  "action": "restart_service" | "scale_up" | "clear_cache" | "notify_human" | "none",
  "target": "namn på systemet/tjänsten om det går att se, annars null",
  "recommendation": "kort mening om vad som bör göras"
}

Titel: ${title}
Beskrivning: ${description}
`;
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No response from AI");

    const result = JSON.parse(content as string);

    console.log("RESULT: " + result);

    return result;
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      type: "unknown",
      priority: "medium",
      action: "notify_human",
      target: null,
      recommendation: "Unable to analyze incident automatically.",
    };
  }
}

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
