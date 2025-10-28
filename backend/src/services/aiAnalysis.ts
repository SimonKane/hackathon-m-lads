// ============================================
// AI ANALYSIS SERVICE - Analysera incidenter
// ============================================

// SYFTE:
// Denna fil innehåller logik för att automatiskt analysera incidenter.
// AI:n (i detta fall enkel keyword-matching) avgör typ och prioritet.
import OpenAI from "openai";
// UPPGIFT - STEG 1: Skapa en analysfunktion

console.log(
  "API Key loaded:",
  process.env.OPENROUTER_API_KEY ? "✓ Yes" : "✗ No"
);

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000", // Optional, for including your app on openrouter.ai rankings.
    "X-Title": "AI Incident Manager", // Optional, shows in rankings on openrouter.ai.
  },
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
  // SIMULATED AI ANALYSIS - Using keyword matching instead of real API
  // Real API code is commented below:

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;

    console.log("AI CONTENT: " + content);

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

  // KEYWORD-BASED SIMULATION
  // const text = `${title} ${description}`.toLowerCase();

  // let type = "unknown";
  // let priority = "medium";
  // let action = "notify_human";
  // let target = null;
  // let recommendation = "Manual investigation required.";

  // // Check for server down issues
  // if (
  //   text.includes("down") ||
  //   text.includes("crashed") ||
  //   text.includes("offline") ||
  //   text.includes("not responding")
  // ) {
  //   type = "server_down";
  //   priority = "critical";
  //   action = "restart_service";
  //   recommendation = "Restart service and check logs for root cause.";
  // }
  // // Check for CPU issues
  // else if (
  //   text.includes("cpu") ||
  //   text.includes("slow") ||
  //   text.includes("performance") ||
  //   text.includes("lag")
  // ) {
  //   type = "high_cpu";
  //   priority = "high";
  //   action = "scale_up";
  //   recommendation = "Scale horizontally or check processes consuming CPU.";
  // }
  // // Check for memory issues
  // else if (
  //   text.includes("memory") ||
  //   text.includes("leak") ||
  //   text.includes("oom") ||
  //   text.includes("out of memory")
  // ) {
  //   type = "memory_leak";
  //   priority = "high";
  //   action = "restart_service";
  //   recommendation =
  //     "Restart service and review recent changes for memory leaks.";
  // }
  // // Check for network issues
  // else if (
  //   text.includes("network") ||
  //   text.includes("connection") ||
  //   text.includes("timeout") ||
  //   text.includes("latency")
  // ) {
  //   type = "network_issue";
  //   priority = "high";
  //   action = "notify_human";
  //   recommendation = "Check network connectivity and firewall rules.";
  // }

  // // Try to extract target/service name
  // console.log("Analyzing text for target:", text);

  // // Pattern 1: Look for "on [service name]" (e.g., "on API gateway")
  // let serviceMatch = text.match(/(?:on|for|in)\s+([\w-]+)/i);

  // // Pattern 2: Look for words containing "api", "gateway", "server", etc.
  // if (!serviceMatch) {
  //   serviceMatch = text.match(
  //     /\b(api[\w-]*|[\w-]*gateway|[\w-]*server|[\w-]*service)\b/i
  //   );
  // }

  // // Pattern 3: Look for hyphenated names (like api-gw, web-server)
  // if (!serviceMatch) {
  //   serviceMatch = text.match(/\b([\w]+-[\w]+(?:-[\w]+)?)\b/i);
  // }

  // // Pattern 4: Look for capitalized service names before conversion to lowercase
  // const originalText = `${title} ${description}`;
  // const capsMatch = originalText.match(/\b([A-Z]{2,}[-\w]*)\b/);
  // if (!serviceMatch && capsMatch) {
  //   target = capsMatch[1].toLowerCase();
  // }

  // if (serviceMatch && !target) {
  //   target = serviceMatch[1].trim();
  // }

  // console.log("Found target:", target);

  // const result = {
  //   type,
  //   priority,
  //   action,
  //   target,
  //   recommendation,
  // };

  // return result;
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
