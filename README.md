# Green Campus AI

### AI-Powered Sustainability Management & Decision Support Platform

Green Campus AI is a sustainability management platform designed to help educational institutions understand campus resource usage and identify practical actions across **energy, water, waste, transportation, and campus operations**.

The platform combines **Retrieval-Augmented Generation (RAG), IBM Granite through watsonx.ai, sustainability knowledge resources, analytics, and responsible AI principles** to provide grounded sustainability guidance.

---

## 🌱 Project Overview

Educational campuses manage several interconnected sustainability challenges:

* Energy consumption
* Water usage
* Waste management
* Transportation
* Sustainable campus operations

Information about these areas is often distributed across different resources, making it difficult to turn sustainability information into practical actions.

**Green Campus AI brings these areas together in one platform.**

Users can explore sustainability information, ask questions, assess campus conditions, view resource analytics, and receive structured recommendations.

---

## 🎯 Sustainable Development Goals

### Primary SDG

**SDG 11 — Sustainable Cities and Communities**

The project focuses on supporting more sustainable and resilient campus environments.

### Supporting SDGs

* **SDG 6 — Clean Water and Sanitation**
* **SDG 7 — Affordable and Clean Energy**
* **SDG 12 — Responsible Consumption and Production**
* **SDG 13 — Climate Action**

---

## ✨ Key Features

### AI Sustainability Advisor

Users can ask questions about campus sustainability and receive practical recommendations.

Example:

> How can our college reduce electricity consumption?

The system uses relevant sustainability information to generate a grounded response.

### Knowledge Base & RAG

The platform retrieves relevant information from a curated sustainability knowledge base before generating responses.

Basic workflow:

```text
User Question
      ↓
Question Processing
      ↓
Knowledge Retrieval
      ↓
Relevant Context
      ↓
IBM Granite
      ↓
Grounded Response
```

### Campus Sustainability Assessment

Users can provide campus-related information across areas such as:

* Energy
* Water
* Waste
* Transportation
* Buildings

The platform organizes the information into a sustainability profile and identifies areas where action may be useful.

### Resource Analytics

The platform provides visual analytics for:

* Energy
* Water
* Waste
* Transportation

These dashboards help users understand resource-related patterns and identify areas for improvement.

### AI Action Plans

Recommendations can be organized into:

* **Quick Wins**
* **Medium-Term Actions**
* **Long-Term Actions**

This helps turn sustainability information into practical next steps.

### Responsible AI

The platform incorporates:

* Transparency
* Privacy
* Fairness
* Safety
* Human oversight
* Grounded responses

AI recommendations are intended to support human decision-making rather than replace institutional decision-makers.

---

## 🧠 AI Architecture

The AI workflow combines RAG with IBM Granite.

```text
                User
                  │
                  ▼
          Green Campus AI
                  │
                  ▼
          Question Analysis
                  │
                  ▼
         Knowledge Retrieval
                  │
                  ▼
        Sustainability Context
                  │
                  ▼
            IBM Granite
                  │
                  ▼
        Responsible AI Checks
                  │
                  ▼
       Practical Recommendation
```

The system does not rely only on a general language model. Relevant sustainability information is retrieved first and provided as context for response generation.

---

## 🏗️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide Icons

### Backend

* Python
* FastAPI
* Uvicorn
* SQLite
* Pydantic

### AI

* IBM watsonx.ai
* IBM Granite
* Retrieval-Augmented Generation (RAG)
* Vector / similarity-based retrieval
* Responsible AI safeguards

---

## 📁 Project Structure

```text
green-campus-ai/
│
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── config.py
│   ├── models.py
│   ├── requirements.txt
│   │
│   ├── data/
│   │   └── knowledge_base.json
│   │
│   ├── services/
│   │   └── ai/
│   │       ├── granite_service.py
│   │       ├── rag_service.py
│   │       ├── agent_service.py
│   │       └── safety_service.py
│   │
│   └── routers/
│       ├── auth.py
│       ├── ai.py
│       ├── assessment.py
│       ├── analytics.py
│       ├── actions.py
│       ├── knowledge.py
│       └── notifications.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .env.example
└── README.md
```

---

## 🚀 Running the Project

### Requirements

* Python 3.10+
* Node.js 18+
* npm

### 1. Start the Backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Health check:

```text
http://127.0.0.1:8000/api/health
```

### 2. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔐 IBM Granite Configuration

For AI response generation, the application can connect to **IBM watsonx.ai** and an IBM Granite model.

Configure the required credentials through environment variables rather than placing credentials directly in the source code.

Example:

```env
IBM_WATSONX_API_KEY=your_api_key
IBM_PROJECT_ID=your_project_id
IBM_URL=https://us-south.ml.cloud.ibm.com
IBM_GRANITE_MODEL=your_granite_model_id
```

### Security

Never commit real API keys or credentials to GitHub.

Use `.env` for local credentials and keep `.env` excluded from version control.

---

## 🔎 RAG Workflow

Green Campus AI uses a retrieval-based workflow to improve the relevance of sustainability responses.

```text
Sustainability Knowledge
        ↓
Document Processing
        ↓
Knowledge Storage
        ↓
Similarity Search
        ↓
Relevant Information
        ↓
IBM Granite
        ↓
Grounded Answer
```

The knowledge base can contain information related to:

* Energy efficiency
* Water conservation
* Waste management
* Sustainable transportation
* Renewable energy
* Green buildings
* Campus sustainability practices

---

## 🛡️ Responsible AI

Green Campus AI follows responsible AI principles throughout the system.

### Transparency

Users should understand when information or recommendations are generated using AI.

### Privacy

The application should avoid unnecessary collection of personal information.

### Fairness

Recommendations should avoid assumptions based on sensitive or unrelated personal characteristics.

### Safety

The system should avoid presenting uncertain recommendations as guaranteed outcomes.

### Human Oversight

AI provides recommendations and information. Final institutional decisions remain with appropriate people and authorities.

---

## 📊 Data & Results

Some application dashboards may use sample or user-provided data when direct campus measurement systems are unavailable.

Such information should not be interpreted as measured environmental performance unless it comes from validated campus data.

Actual environmental improvements require:

* Real measurements
* Appropriate validation
* Institutional data
* Continuous monitoring
* Human review

---

## 🔮 Future Scope

Potential future improvements include:

* Integration with smart energy meters
* Real-time water monitoring
* Automated waste tracking
* Campus IoT integration
* Multilingual sustainability assistance
* Improved forecasting
* Mobile application
* Integration with institutional sustainability databases
* Additional sustainability knowledge sources

---

## 👩‍💻 Project

**Green Campus AI**

Developed as part of the **1M1B AI for Sustainability Virtual Internship in collaboration with IBM SkillsBuild and AICTE**.

**Student:** Katta Sanvee

**Internship ID:** `INTERNSHIP_17828984086a44dee80acf6`

---

## 📌 Note

Green Campus AI is designed as a sustainability decision-support platform. AI-generated recommendations should be reviewed by appropriate users and validated against real campus information before being used for operational decisions.
