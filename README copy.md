# 🎯 InterviewAI — AI-Powered Video Interview Preparation System

> Built by **Aditya Jaiswal** | Stack: React + Node.js + Express + MongoDB + Python (FastAPI) + Claude AI

---

## 📁 Project Structure

```
ai-interview-prep/
├── backend/                  # Node.js + Express API
│   ├── models/
│   │   └── Session.js        # Mongoose schema
│   ├── routes/
│   │   ├── interview.js      # Question generation (Claude API)
│   │   ├── session.js        # Session CRUD
│   │   ├── evaluation.js     # AI answer scoring (Claude API)
│   │   └── report.js         # Report aggregation
│   ├── server.js             # Express entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/                 # React + Vite
│   ├── src/
│   │   ├── context/
│   │   │   └── InterviewContext.jsx   # Global state (useReducer)
│   │   ├── hooks/
│   │   │   ├── useSpeechRecognition.js  # Web Speech API
│   │   │   └── useMediaRecorder.js      # WebRTC / MediaRecorder
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SetupPage.jsx
│   │   │   ├── InterviewPage.jsx   # 🎥 Core video interview
│   │   │   ├── ReportPage.jsx      # 📊 Charts + Q&A breakdown
│   │   │   └── HistoryPage.jsx
│   │   ├── utils/
│   │   │   └── api.js              # Axios API client
│   │   ├── styles/
│   │   │   └── global.css          # Design system
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── .env.example
│   └── package.json
│
├── python-service/           # FastAPI NLP microservice
│   ├── main.py               # Sentiment + filler word analysis
│   ├── requirements.txt
│   └── .env.example
│
└── README.md
```

---

## ⚙️ Setup & Run

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB running locally (or MongoDB Atlas URI)
- Anthropic API key

---

### 1. Clone & configure

```bash
git clone <your-repo>
cd ai-interview-prep
```

---

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env — add MONGO_URI and ANTHROPIC_API_KEY
npm install
npm run dev        # runs on http://localhost:5000
```

**.env (backend)**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai_interview_prep
ANTHROPIC_API_KEY=sk-ant-...your key here...
PYTHON_SERVICE_URL=http://localhost:8000
NODE_ENV=development
```

---

### 3. Python NLP Service

```bash
cd python-service
cp .env.example .env
pip install -r requirements.txt
python main.py     # runs on http://localhost:8000
```

---

### 4. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev        # runs on http://localhost:3000
```

**.env (frontend)**
```
VITE_API_URL=http://localhost:5000/api
```

---

## 🚀 Usage

1. Open **http://localhost:3000**
2. Click **Start Interview**
3. Select your **role** (e.g. Software Engineer)
4. Choose **difficulty** and **question count**
5. Allow camera & microphone
6. Answer each question by clicking **Start Recording**
7. Speech-to-text captures your answer live
8. Click **Finish & Get Report**
9. View your **detailed AI report** with charts, scores, sample answers

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/interview/roles` | List available job roles |
| POST | `/api/interview/generate-questions` | Generate questions via Claude |
| POST | `/api/session/create` | Create new interview session |
| GET | `/api/session/:id` | Get session details |
| POST | `/api/session/:id/answer` | Save a transcript answer |
| PATCH | `/api/session/:id/complete` | Mark session complete |
| GET | `/api/session/list/all` | List all sessions |
| POST | `/api/evaluation/evaluate-answer` | Score single answer via Claude |
| POST | `/api/evaluation/evaluate-session` | Score all answers in session |
| GET | `/api/report/:sessionId` | Get full report |
| POST | `/analyze` | Python NLP analysis (port 8000) |

---

## 🧠 How the AI Works

### Question Generation
Claude receives a prompt with role, difficulty, and focus areas. It returns a JSON array of tailored interview questions.

### Answer Evaluation
Each transcript is sent to Claude with the question and role context. Claude returns:
- **Scores**: relevance, clarity, completeness, communication (0–10)
- **Feedback**: 2–3 sentence personalized critique
- **Sample Answer**: model response at expert level
- **Strengths & Improvements**: bullet points

### Python NLP Layer
Runs `TextBlob` on each transcript to extract:
- Sentiment polarity & subjectivity
- Filler word detection
- Vocabulary richness
- Confidence score heuristic

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6, Framer Motion, Recharts |
| Backend | Node.js, Express, dotenv, morgan, express-validator |
| Database | MongoDB, Mongoose |
| AI / LLM | Anthropic Claude API (`@anthropic-ai/sdk`) |
| Python NLP | FastAPI, TextBlob, NLTK, Uvicorn |
| Video/Audio | WebRTC MediaRecorder, Web Speech API |

---

## 🔮 Future Enhancements

- [ ] Whisper API fallback for better transcription
- [ ] Emotion detection via OpenCV (Python service)
- [ ] Company-specific question packs
- [ ] PDF report download
- [ ] User auth with JWT

---

*Status: 🚧 In Development | Apr 28 – May 5, 2026*
