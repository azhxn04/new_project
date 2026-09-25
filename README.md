# 🇮🇳 VyaparMitra (व्यापार मित्र)
> A smart enterprise co-pilot for MSMEs combining modern predictive machine learning, real-time generative AI, and sustainable economic principles from the Indian Knowledge System (IKS).
---
## 📌 Overview
Micro, Small, and Medium Enterprises (MSMEs) face operational roadblocks—from unpredictable seasonal demands and cash-flow bottlenecks to complex regulatory compliance. 
**VyaparMitra** is a full-stack platform built to automate business health checks, forecast inventory requirements, and deliver contextual advisory support in real time.
---
## ⚡ Core Features
* **Predictive Demand & Risk Modeling**: Powered by an XGBoost / Gradient Boosting ML engine trained on curated historical operational datasets (80/20 train-test split) to evaluate enterprise risk metrics and seasonal sales trends.
* **Intelligent Business Advisory**: Integrated with Google Gemini 2.5 Flash for rapid, natural language reasoning, automated reports, and operational guidance.
* **Indian Knowledge System (IKS) Integration**: 
  * *Arthashastra Financial Health*: Tracks operational capital vs. *Aapad-Kosh* (emergency reserves).
  * *Ritu Chakra Analytics*: Temporal forecasting aligned with Indian seasonal and festival demand patterns.
  * *Shreni Network Trust Metric*: Structured merchant peer validation modeled after traditional trade guilds.
* **Real-Time Data Layer**: Built on Supabase (PostgreSQL) for transactional persistence, live updates, and secure user management.
---
## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, Vite, JavaScript, HTML5, Modern CSS |
| **Backend** | Node.js, Express |
| **Database** | Supabase (PostgreSQL) |
| **Generative AI** | Google Gemini 2.5 Flash API |
| **Machine Learning** | Python, XGBoost, Scikit-Learn (Gradient Boosting), Pandas, NumPy |
| **Cloud & DevOps** | Vercel (Monorepo setup), GitHub, VS Code |

---
## 📁 Repository Structure
```text
├── frontend/             # React (Vite) client application
│   ├── src/              # Dashboard components, pages, and IKS widgets
│   ├── package.json      # Client dependencies
│   └── vite.config.js    # Vite build setup
├── backend/              # Node.js Express server
│   ├── server.js         # API routes & Gemini Flash endpoints
│   └── package.json      # Server dependencies
├── ml_engine/            # Python predictive models
│   ├── train_model.py    # Training scripts (XGBoost / Gradient Boosting)
│   └── requirements.txt  # Python ML libraries
├── vercel.json           # Vercel monorepo routing and rewrites
└── README.md             # Project documentation
