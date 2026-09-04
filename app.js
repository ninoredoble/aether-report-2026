/**
 * Aether Report 2026 - Regional AI & Autonomous Systems Telemetry Engine
 * 100% 7-Bit ASCII Character Encoding - Zero Mojibake
 * Integrated Architecture: Agus-Pulangi Hydro Baseload, Edge Inference, Ecological Meshes
 */

// 1. Ambient Fluid Canvas Animation
document.addEventListener("DOMContentLoaded", () => {
  initFluidShader();
  initQuarterSelector();
  initClusterNodes();
  initAuditorAgent();
  initExportAction();
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
    t += 0.0025;
    ctx.clearRect(0, 0, width, height);

    // Dynamic Ethereal Orbs
    const x1 = width * 0.3 + Math.sin(t) * 120;
    const y1 = height * 0.35 + Math.cos(t * 0.8) * 90;
    const grad1 = ctx.createRadialGradient(x1, y1, 30, x1, y1, width * 0.45);
    grad1.addColorStop(0, "rgba(56, 189, 248, 0.16)");
    grad1.addColorStop(1, "transparent");

    const x2 = width * 0.72 + Math.cos(t * 0.7) * 140;
    const y2 = height * 0.65 + Math.sin(t * 1.1) * 100;
    const grad2 = ctx.createRadialGradient(x2, y2, 40, x2, y2, width * 0.45);
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

// 2. Multi-Quarter Time-Series Telemetry Engine
const QUARTER_DATA = [
  {
    id: "2024-q1",
    label: "2024 Q1",
    hydroMw: 280,
    computePflops: 2.8,
    nodes: "24,000",
    latency: "9.4 ms",
    pue: "1.14",
    offsetMt: "6,200 MT CO2e"
  },
  {
    id: "2024-q3",
    label: "2024 Q3",
    hydroMw: 310,
    computePflops: 4.5,
    nodes: "42,000",
    latency: "7.8 ms",
    pue: "1.12",
    offsetMt: "11,400 MT CO2e"
  },
  {
    id: "2025-q1",
    label: "2025 Q1",
    hydroMw: 340,
    computePflops: 7.2,
    nodes: "68,000",
    latency: "6.2 ms",
    pue: "1.09",
    offsetMt: "19,500 MT CO2e"
  },
  {
    id: "2025-q3",
    label: "2025 Q3",
    hydroMw: 375,
    computePflops: 11.6,
    nodes: "95,000",
    latency: "5.1 ms",
    pue: "1.08",
    offsetMt: "28,100 MT CO2e"
  },
  {
    id: "2026-q1",
    label: "2026 Q1",
    hydroMw: 395,
    computePflops: 15.2,
    nodes: "114,000",
    latency: "4.6 ms",
    pue: "1.07",
    offsetMt: "36,400 MT CO2e"
  },
  {
    id: "2026-q3",
    label: "2026 Q3",
    hydroMw: 412,
    computePflops: 18.4,
    nodes: "128,000",
    latency: "4.2 ms",
    pue: "1.06",
    offsetMt: "42,800 MT CO2e"
  }
];

function selectQuarter(index) {
  const d = QUARTER_DATA[index];
  if (!d) return;

  // Update button active state
  document.querySelectorAll(".q-btn").forEach((btn, i) => {
    if (i === index) btn.classList.add("active");
    else btn.classList.remove("active");
  });

  // Update SVG dots
  document.querySelectorAll(".chart-dot").forEach(dot => {
    const dotIdx = parseInt(dot.getAttribute("data-idx"), 10);
    if (dotIdx === index) {
      dot.classList.add("selected");
      dot.setAttribute("r", "6.5");
    } else {
      dot.classList.remove("selected");
      dot.setAttribute("r", "4.5");
    }
  });

  // Update Dossier Readout
  document.getElementById("dossierQuarter").textContent = d.label + " BENCHMARK:";
  document.getElementById("dossierDetails").textContent = 
    "Firm Load: " + d.hydroMw + " MW // Compute: " + d.computePflops + " PFLOPS // PUE: " + d.pue + " // Offset: " + d.offsetMt;
}

function initQuarterSelector() {
  document.querySelectorAll(".q-btn").forEach((btn, i) => {
    btn.addEventListener("click", () => selectQuarter(i));
  });

  document.querySelectorAll(".chart-dot").forEach(dot => {
    dot.addEventListener("click", function() {
      const idx = parseInt(this.getAttribute("data-idx"), 10);
      selectQuarter(idx);
    });
  });
}

// 3. Regional Node Cluster Dossier
const NODE_INFO = {
  tagoloan: {
    title: "TAGOLOAN INDUSTRIAL EDGE CLUSTER",
    desc: "Colocated at the PHIVIDEC industrial sub-transmission substation. Houses 128 modular edge compute server cabinets cooled with ambient river heat exchangers. Directly drives predictive load balancing for heavy industrial fabrication and aluminum smelting operations."
  },
  cdo: {
    title: "CAGAYAN RIVER BASIN TELEMETRY HUB",
    desc: "Positioned in Carmen Valley directly adjacent to the Macasandig hydrologic gauge array. Processes 6 upstream tributary gauge signals via localized neural differential solvers, providing downstream urban barangays with a 45-minute advance flood warning window."
  },
  kitanglad: {
    title: "MOUNT KITANGLAD HIGH-ALTITUDE NODE",
    desc: "Operating at 1,800m elevation above the cloud base. Acts as an agro-satellite ground relay for Bukidnon coffee, pineapple, and cacao smallholder farming cooperatives running offline-first FAO-56 Penman-Monteith crop evapotranspiration models."
  },
  macajalar: {
    title: "MACAJALAR BAY MARINE ACOUSTIC ARRAY",
    desc: "Directly linked to subsea bathymetric hydrophones and multi-spectral benthic imagery cameras spanning Initao and Jasaan sanctuaries. Solves hydrodynamic larval drift vectors and monitors NOAA Degree Heating Weeks (DHW) thermal bleaching anomalies."
  },
  iligan: {
    title: "ILIGAN HYDRO-COMPUTE CAMPUS",
    desc: "Situated inside the Agus IV hydroelectric facility perimeter with dedicated high-voltage busbar coupling. Serves as Northern Mindanao's primary zero-carbon model training and synthetic simulation cluster operating with 99.8% firm renewable uptime."
  }
};

function initClusterNodes() {
  document.querySelectorAll(".cluster-card").forEach(card => {
    card.addEventListener("click", function() {
      document.querySelectorAll(".cluster-card").forEach(c => c.classList.remove("active"));
      this.classList.add("active");

      const nodeKey = this.getAttribute("data-node");
      const info = NODE_INFO[nodeKey];
      if (info) {
        document.getElementById("dossierNodeTitle").textContent = info.title;
        document.getElementById("dossierNodeDesc").textContent = info.desc;
      }
    });
  });
}

// 4. In-Context Auditor AI Agent Knowledge Base
const KNOWLEDGE_BASE = {
  "carbon": "The 2026 Northern Mindanao compute topology achieves a 91.4% carbon reduction relative to fossil-fueled hyperscale cloud centers by colocating GPU/TPU nodes directly with Agus IV and Pulangi IV run-of-river hydropower cascades. Avoided regional emissions exceed 42,800 MT CO2e annually.",
  "basin": "The Cagayan Basin Corridor integrates 6 acoustic-radar telemetry stations (Talakag, Kabula, Bubunawan, Macasandig, Carmen, Puntod). A dynamic Saint-Venant hydraulic routing engine models storm hydrographs against the 3,600 m3/s levee limit, delivering a 45-minute civic evacuation buffer.",
  "marine": "The Archipelago Marine Cadence engine tracks NOAA Degree Heating Weeks (DHW) and bathymetric transects from 0m down to 4,200m depth across 8 Mindanao sanctuaries. It models pelagic larval drift trajectories at 1.1 to 2.4 knots to coordinate cross-boundary marine protection.",
  "scada": "The Mindanao Grid Mesh simulator models a 138kV/69kV sub-transmission network governed by the generator swing equation J*(df/dt) = P_gen - P_load - D*(f - f0). It features automated Under-Frequency Load Shedding (UFLS Stage 1 at 59.50 Hz, Stage 2 at 59.20 Hz) to eliminate cascading blackouts.",
  "android": "ClimaPocket Android operates on Google Pixel 9 Pro with Android 15 and Material You 3.5. It evaluates real-time FAO-56 Penman-Monteith reference evapotranspiration (ET0), pesticide drift risk windows, and provides an offline-first Room SQLite cache for mountain farming cooperatives.",
  "hablon": "The Hablon Textile Archive digitizes T'boli T'nalak (D4 dihedral group), Yakan Seputangan (P4m wallpaper group), Inaul Maguindanao (Pm wave), and Maranao Okir (C2 scroll). An interactive backstrap loom simulator reconstructs indigenous weaving pickups in vector mathematical drafts.",
  "relay": "Relay Core API provides an ultra-low latency webhook dispatch gateway in Go and Redis. It enforces strict idempotency locking with SHA-256 event keys to prevent duplicate transactions, coupled with decorrelated jitter exponential retry backoff and hex-dump inspection."
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
    const q = query.toLowerCase();
    let response = "Based on Northern Mindanao's 2026 telemetry streams, all 5 regional edge clusters operate within grid stability margins with 100% run-of-river hydro attribution, median 4.2ms latency, and continuous civic telemetry integration.";

    if (q.includes("carbon") || q.includes("hydro") || q.includes("baseload") || q.includes("offset") || q.includes("pue")) {
      response = KNOWLEDGE_BASE["carbon"];
    } else if (q.includes("cagayan") || q.includes("basin") || q.includes("flood") || q.includes("watershed") || q.includes("river")) {
      response = KNOWLEDGE_BASE["basin"];
    } else if (q.includes("marine") || q.includes("cadence") || q.includes("bleach") || q.includes("dhw") || q.includes("ocean") || q.includes("bay")) {
      response = KNOWLEDGE_BASE["marine"];
    } else if (q.includes("scada") || q.includes("grid") || q.includes("frequency") || q.includes("blackout") || q.includes("ufls") || q.includes("power")) {
      response = KNOWLEDGE_BASE["scada"];
    } else if (q.includes("android") || q.includes("clima") || q.includes("agro") || q.includes("fao") || q.includes("evapo") || q.includes("spray") || q.includes("pixel")) {
      response = KNOWLEDGE_BASE["android"];
    } else if (q.includes("hablon") || q.includes("textile") || q.includes("weave") || q.includes("symmetry") || q.includes("t'boli") || q.includes("inaul")) {
      response = KNOWLEDGE_BASE["hablon"];
    } else if (q.includes("relay") || q.includes("webhook") || q.includes("idempotency") || q.includes("redis") || q.includes("api")) {
      response = KNOWLEDGE_BASE["relay"];
    }

    appendMessage("AE", response, false);
  }, 350);
}

function appendMessage(avatar, text, isUser) {
  const box = document.getElementById("dialogueBox");
  const row = document.createElement("div");
  row.className = "msg-row " + (isUser ? "user-row" : "agent-row");
  row.innerHTML = 
    '<span class="msg-avatar">' + avatar + '</span>' +
    '<div class="msg-bubble">' + text + '</div>';
  box.appendChild(row);
  box.scrollTop = box.scrollHeight;
}

function initAuditorAgent() {
  window.askAuditor = askAuditor;
  window.sendUserMessage = sendUserMessage;
  window.handleInputKey = handleInputKey;
}

// 5. Regional Audit JSON Exporter
function initExportAction() {
  const btn = document.getElementById("btnExportAudit");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const report = {
      report_title: "Aether Report 2026: Northern Mindanao Regional Telemetry Audit",
      publication_volume: "Vol. III (2026 Annual Edition)",
      jurisdiction: "Region X, Northern Mindanao, Philippines",
      generated_at: new Date().toISOString(),
      cryptographic_digest: "sha256:7b8f9a2c1e4d893450912abcf01234876abcdef0123456789abcdef012345678",
      macro_indicators: {
        aggregate_clean_compute_pflops: 18.4,
        median_edge_inference_latency_ms: 4.2,
        active_telemetry_mesh_nodes: 128000,
        annual_carbon_offset_metric_tons: 42800,
        average_data_center_pue: 1.06,
        primary_power_source: "100% Agus-Pulangi Run-of-River Hydroelectric Cascade"
      },
      quarterly_time_series: QUARTER_DATA,
      regional_edge_nodes: NODE_INFO,
      engineering_subsystems_audited: [
        "cagayan-basin-corridor (Hydrologic & Flood Early-Warning Modeling)",
        "archipelago-marine-cadence (NOAA DHW Bleaching & Seafloor Bathymetry)",
        "mindanao-grid-mesh (138kV SCADA Mimic Board & Swing Equation Physics)",
        "hablon-textile-archive (Algorithmic Symmetry Digitization & Digital Loom)",
        "relay-core-api (Idempotent Webhook Dispatch Gateway & CLI Terminal)",
        "clima-pocket-android (Google Pixel 9 Pro Material You Agrometeorology)"
      ]
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report, null, 2));
    const dl = document.createElement("a");
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", "aether_2026_regional_telemetry_audit.json");
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  });
}