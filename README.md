# GREEN CAMPUS AI

### AI-Powered Sustainability Management & Decision Support Platform

**1M1B AI for Sustainability Virtual Internship**  
*In collaboration with IBM SkillsBuild and AICTE*  

- **Student:** Katta Sanvee  
- **Internship ID:** `INTERNSHIP_17828984086a44dee80acf6`  
- **Primary SDG:** **SDG 11 — Sustainable Cities and Communities**  
- **Secondary SDGs:** SDG 6 (Clean Water & Sanitation), SDG 7 (Affordable & Clean Energy), SDG 12 (Responsible Consumption & Production), SDG 13 (Climate Action)  

---

## 1. Project Purpose & Overview

Educational institutions operate as micro-cities, generating substantial environmental footprints across electricity baseloads, freshwater draw, cafeteria food scraps, and single-occupancy commuter trips. However, the true barrier is not simply consumption: **students, faculty, and campus administrators lack an accessible, trustworthy tool that connects fragmented sustainability data and institutional guidelines with practical, prioritized actions.**

**GreenCampus AI** solves this dilemma through:
1. **IBM Granite Foundation Models / watsonx.ai** for enterprise generative decision support (with an honest, local grounded fallback provider).
2. **Retrieval-Augmented Generation (RAG)** retrieving verified institutional manuals (BEE, UNEP, CPCB, MNRE) before synthesizing recommendations.
3. **6-Step Observable Agent Workflow** (Intent → Domain → RAG → Grounding → Synthesis → Safety Verification).
4. **Campus Sustainability Assessment** generating an objective Prototype Sustainability Profile.
5. **Resource Telemetry Analytics** for Energy, Water, Waste, and Commuter Mobility.
6. **AI Action Plan** structured into Quick-Win, Medium-Term, and Long-Term tiers.
7. **Responsible AI by Design** strictly enforcing Fairness, Transparency, Privacy, Safety, and Human Oversight.
8. **Built-in 12-Slide Presentation Deck** for evaluators (`/presentation` and standalone `presentation.html`).

---

## 2. Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend:** Python 3.12, FastAPI, Uvicorn, SQLite3, Pydantic v2.
- **AI & RAG:** IBM Granite (watsonx.ai REST client) + Local Grounded RAG with TF-IDF/Vector similarity scoring and Responsible AI safety filter.
- **Charts:** Custom responsive SVG & Canvas line, bar, and donut charts.

---

## 3. Project Directory Structure

```
green-campus-ai/
├── backend/
│   ├── main.py                     # FastAPI entry point, CORS, search, health check
│   ├── database.py                 # SQLite schema, initial seeding of demo data
│   ├── config.py                   # Environment config (IBM watsonx.ai credentials)
│   ├── models.py                   # Pydantic schemas
│   ├── requirements.txt            # Python dependencies
│   ├── data/
│   │   ├── knowledge_base.json     # Curated institutional sustainability manuals
│   │   └── campus_sustainability.db# SQLite database
│   ├── services/
│   │   └── ai/
│   │       ├── granite_service.py  # IBM Granite REST client + Demo AI Mode fallback
│   │       ├── rag_service.py      # TF-IDF & vector retrieval over knowledge base
│   │       ├── agent_service.py    # 6-step multi-domain agent coordinator
│   │       └── safety_service.py   # Responsible AI & safety guardrails
│   └── routers/
│       ├── auth.py                 # Login, signup, 1-click demo accounts
│       ├── ai.py                   # AI query endpoints & sample questions
│       ├── assessment.py           # Campus sustainability profile calculator
│       ├── analytics.py            # Energy, water, waste, transport endpoints
│       ├── actions.py              # Action items & status updates
│       ├── knowledge.py            # CRUD operations for knowledge base admin
│       └── notifications.py        # Notification delivery & read tracking
├── frontend/
│   ├── src/
│   │   ├── components/             # Navbar, Sidebar, Modals, SVG Charts
│   │   ├── pages/                  # 16 complete functional pages
│   │   ├── services/api.ts         # Central API client
│   │   └── types/index.ts          # TypeScript interfaces
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
├── presentation.html               # Standalone 12-slide presentation file
├── .env.example
└── README.md
```

---

## 4. How to Run Locally

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### A. Run Backend
```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The backend will run on `http://127.0.0.1:8000`. Test health at `http://127.0.0.1:8000/api/health`.

### B. Run Frontend
```bash
cd frontend
npm install
npm run dev
```
The frontend will run on `http://localhost:5173`.

---

## 5. IBM Granite Configuration Steps

GreenCampus AI is pre-configured with a transparent **Demo AI Mode (Local Grounded RAG)** that runs offline with zero external credentials.

To connect live IBM watsonx.ai foundation models:
1. Obtain an **IBM Cloud API Key** from [cloud.ibm.com](https://cloud.ibm.com).
2. Create a project in [watsonx.ai](https://dataplatform.cloud.ibm.com) and copy the **Project ID (GUID)**.
3. Configure your operating environment or create a `.env` file in `backend/`:
   ```env
   IBM_WATSONX_API_KEY=your_ibm_api_key_here
   IBM_PROJECT_ID=your_watsonx_project_id_here
   IBM_URL=https://us-south.ml.cloud.ibm.com
   IBM_GRANITE_MODEL=ibm/granite-3-8b-instruct
   ```
4. Restart the backend. The platform badge will instantly update from:
   `Demo AI Mode (Local Grounded RAG)` → `IBM Granite Connected`.

---

## 6. Demo Mode Credentials (1-Click Available)

On the `/login` screen, you can click either pre-loaded demo account button:
- **Student Researcher:** `student@greencampus.edu` (Password: `student123`)
- **Campus Director (Admin):** `admin@greencampus.edu` (Password: `admin123`)

---

## 7. 5-Minute Evaluator Presentation Script

1. **0:00 - 0:45 (Landing Page):** Open `/`, introduce GreenCampus AI, student Katta Sanvee, 1M1B context, and SDG 11 primary alignment.
2. **0:45 - 1:15 (Login & User Persona):** Demonstrate 1-click demo login, showing the personalized User Dashboard (`/dashboard`) with 4 telemetry cards labeled *"Demo / Estimated"*.
3. **1:15 - 2:30 (AI Advisor & RAG):** Ask sample query: *"How can our college reduce electricity consumption?"*. Highlight the 6-step agent execution pipeline and inspect the RAG citations drawer.
4. **2:30 - 3:30 (Assessment & Action Plan):** Fill campus parameters (`/assessment`), generate the Prototype Sustainability Profile, and mark an item as Completed in `/action-plan`.
5. **3:30 - 4:30 (Analytics & Responsible AI):** Review Energy/Water/Waste/Transport telemetry and explain the 5 Responsible AI pillars (`/responsible-ai`).
6. **4:30 - 5:00 (12-Slide Deck):** Navigate to `/presentation` to showcase the 12-slide presentation view.

---

## 8. 12-Slide Presentation Deck Reference

Both built-in at `/presentation` and standalone in `presentation.html`:
- **Slide 1:** Title (GreenCampus AI, Katta Sanvee, 1M1B × IBM SkillsBuild × AICTE, SDG 11)
- **Slide 2:** The Problem (The Campus Sustainability Challenge)
- **Slide 3:** SDG Alignment (Why SDG 11?)
- **Slide 4:** Target Users & Need (Students, Faculty, Administrators, Sustainability Teams)
- **Slide 5:** Proposed Solution (AI + RAG + IBM Granite + Analytics + Agent Workflow + Responsible AI)
- **Slide 6:** Key Features (One Platform, Multiple Sustainability Needs)
- **Slide 7:** AI + RAG Architecture (How AI Works)
- **Slide 8:** Agent Workflow (From Question to Action)
- **Slide 9:** Working Prototype (Dedicated interface placeholders for live demo)
- **Slide 10:** Responsible AI (Fairness, Transparency, Privacy, Safety, Human Oversight)
- **Slide 11:** Expected Impact & Current Limitations (Transparent engineering realism)
- **Slide 12:** Conclusion & Future Scope ("AI should not replace human decisions — it should help people make better-informed ones")

---

## 9. Known Limitations & Engineering Realism

- The prototype utilizes sample and demonstration data where IoT physical meters are not installed.
- Simulated indicators (e.g. *"~35 kL / month water savings"*) are explicitly labeled as **"Demo / Estimated Metrics"** and cannot replace calibrated instrumentation.
- The Campus Sustainability Assessment is an educational prototype and does not represent an official ISO 14001 or NAAC green rating.
- Physical capital investments and electrical modifications require sign-off by licensed institutional facilities engineers.
#   G R E E N - C A M P U S - A I  
 