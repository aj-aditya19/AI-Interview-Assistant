"""
AI Interview Prep — Python NLP Microservice
Runs on port 8000, called by the Node backend for text analysis.
"""

import os
import re
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from textblob import TextBlob
import nltk

load_dotenv()

# Download required NLTK data on first run
for pkg in ['punkt', 'averaged_perceptron_tagger', 'brown']:
    try:
        nltk.download(pkg, quiet=True)
    except Exception:
        pass

app = FastAPI(title="AI Interview NLP Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class TextInput(BaseModel):
    text: str


class AnalysisResult(BaseModel):
    sentiment: str           # positive / neutral / negative
    polarity: float          # -1.0 to 1.0
    subjectivity: float      # 0.0 to 1.0
    word_count: int
    sentence_count: int
    avg_sentence_length: float
    filler_word_count: int
    filler_words_used: list[str]
    vocabulary_richness: float   # unique words / total words
    confidence_score: float      # heuristic 0–10


FILLER_WORDS = [
    'um', 'uh', 'er', 'ah', 'like', 'you know', 'sort of', 'kind of',
    'basically', 'literally', 'actually', 'honestly', 'right', 'okay so',
    'well', 'i mean', 'you see',
]


def analyze_text(text: str) -> dict:
    blob = TextBlob(text)
    words = text.lower().split()
    sentences = [str(s) for s in blob.sentences]

    # Sentiment
    polarity = round(blob.sentiment.polarity, 3)
    subjectivity = round(blob.sentiment.subjectivity, 3)
    if polarity > 0.1:
        sentiment = "positive"
    elif polarity < -0.1:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # Filler words
    text_lower = text.lower()
    found_fillers = [fw for fw in FILLER_WORDS if fw in text_lower]
    filler_count = sum(text_lower.count(fw) for fw in found_fillers)

    # Vocabulary richness
    unique_words = set(re.sub(r'[^a-z\s]', '', text_lower).split())
    vocab_richness = round(len(unique_words) / max(len(words), 1), 3)

    # Avg sentence length
    avg_sent_len = round(len(words) / max(len(sentences), 1), 1)

    # Confidence heuristic (higher word count + lower fillers + positive sentiment = more confident)
    confidence = min(10, max(0,
        5.0
        + (1.5 if len(words) >= 50 else len(words) / 50 * 1.5)
        + (polarity * 2)
        - (filler_count * 0.3)
        + (vocab_richness * 2)
    ))
    confidence = round(confidence, 1)

    return {
        "sentiment": sentiment,
        "polarity": polarity,
        "subjectivity": subjectivity,
        "word_count": len(words),
        "sentence_count": len(sentences),
        "avg_sentence_length": avg_sent_len,
        "filler_word_count": filler_count,
        "filler_words_used": found_fillers,
        "vocabulary_richness": vocab_richness,
        "confidence_score": confidence,
    }


@app.get("/")
def root():
    return {"status": "OK", "service": "AI Interview NLP Service"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/analyze", response_model=AnalysisResult)
def analyze(body: TextInput):
    if not body.text or len(body.text.strip()) < 3:
        raise HTTPException(status_code=400, detail="Text is too short to analyze")
    return analyze_text(body.text)


@app.post("/analyze-batch")
def analyze_batch(texts: list[TextInput]):
    return [analyze_text(t.text) for t in texts]


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
