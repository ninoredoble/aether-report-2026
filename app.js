// Aether Report 2026 — Fluid Shader & In-Context Telemetry Auditor Agent

// 1. Ambient Fluid Canvas Animation
document.addEventListener("DOMContentLoaded", () => {
  initFluidShader();
});

function initFluidShader() {
  const canvas = document.getElementById("fluidCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let t = 0;
  function render() {
    t += 0.003;
    ctx.clearRect(0, 0, width, height);

    // Ethereal floating gradient orbs
    const grad1 = ctx.createRadialGradient(
      width * 0.3 + Math.sin(t) * 120,
      height * 0.4 + Math.cos(t * 0.8) * 80,
      20,
      width * 0.3,
      height * 0.4,
      width * 0.5
    );
    grad1.addColorStop(0, "rgba(56, 189, 248, 0.18)");
    grad1.addColorStop(1, "transparent");

    const grad2 = ctx.createRadialGradient(
      width * 0.7 + Math.cos(t * 0.7) * 140,
      height * 0.6 + Math.sin(t * 1.1) * 100,
      30,
      width * 0.7,
      height * 0.6,
      width * 0.5
    );
    grad2.addColorStop(0, "rgba(52, 211, 153, 0.12)");
    grad2.addColorStop(1, "transparent");

    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    requestAnimationFrame(render);
  }
  render();
}

// 2. Interactive Chart Data Inspector
function inspectChartPoint(type) {
  const dossier = document.getElementById("chartDossier");
  if (type === "hydro") {
    dossier.innerHTML = `<strong>2026 Q3 HYDRO FIRM LOAD:</strong> 412 MW dedicated baseload from Agus IV & Pulangi IV cascades operating at 99.4% stability.`;
  } else {
    dossier.innerHTML = `<strong>2026 Q3 COMPUTE DENSITY:</strong> 18.4 PFLOPS aggregate regional edge capacity with 100% zero-carbon energy attribution.`;
  }
}

// 3. In-Context Auditor AI Agent Knowledge Base
const KNOWLEDGE_BASE = {
  "carbon": "The 2026 Northern Mindanao compute topology achieves a 91.4% carbon reduction compared to traditional hyperscale cloud clusters by colocating edge inference nodes directly with run-of-river hydropower substations in Bukidnon and Lanao del Norte.",
  "hydro": "Bukidnon's Pulangi IV reservoir and the Agus River cascade provide a continuous 412 MW firm renewable capacity dedicated to civil and industrial telemetry meshes, eliminating fossil backup generators.",
  "latency": "Median edge inference latency sits at 4.2ms (p99 8.1ms) across all 14 monitored municipal clusters spanning Cagayan de Oro, Tagoloan, Claveria, and Iligan City.",
  "watershed": "Over 128,000 telemetry nodes—incorporating acoustic flood sensors, river turbidity monitors, and upland rainfall radars—are interconnected with localized neural anomaly detectors to give CDO communities a 45-minute advance alert window for flash flooding."
};

function askAuditor(question) {
  document.getElementById("userInput").value = question;
  sendUserMessage();
}

function handleInputKey(e) {
  if (e.key === "Enter") {
    sendUserMessage();
  }
}

function sendUserMessage() {
  const inputEl = document.getElementById("userInput");
  const query = inputEl.value.trim();
  if (!query) return;

  appendMessage("USR", query, true);
  inputEl.value = "";

  // Simulate in-context reasoning
  setTimeout(() => {
    const qLower = query.toLowerCase();
    let response = "Based on the 2026 Northern Mindanao telemetry streams, our autonomous edge nodes operate with continuous zero-carbon attribution and median 4.2ms inference latency. All municipal clusters remain synchronized within grid safety margins.";

    if (qLower.includes("carbon") || qLower.includes("footprint")) {
      response = KNOWLEDGE_BASE["carbon"];
    } else if (qLower.includes("hydro") || qLower.includes("baseload") || qLower.includes("capacity")) {
      response = KNOWLEDGE_BASE["hydro"];
    } else if (qLower.includes("latency") || qLower.includes("benchmark")) {
      response = KNOWLEDGE_BASE["latency"];
    } else if (qLower.includes("watershed") || qLower.includes("flood") || qLower.includes("sensor")) {
      response = KNOWLEDGE_BASE["watershed"];
    }

    appendMessage("AE", response, false);
  }, 400);
}

function appendMessage(avatar, text, isUser) {
  const box = document.getElementById("dialogueBox");
  const row = document.createElement("div");
  row.className = `msg-row ${isUser ? "user-row" : "agent-row"}`;
  row.innerHTML = `
    <span class="msg-avatar">${avatar}</span>
    <div class="msg-bubble">${text}</div>
  `;
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}
