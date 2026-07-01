import "dotenv/config";

import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateQuestion = async ({
  roundType,
  profile,
  previousTurns = [],
  isFirst = false,
}) => {
  const previousQA = previousTurns
    .map((t) => `Q: ${t.question}\nA: ${t.answer}`)
    .join("\n\n");

  const systemPrompt = `You are a professional interviewer conducting a ${roundType.toUpperCase()} round interview.
The candidate is interviewing for: ${profile.targetRole} at ${profile.targetCompany || "a top company"}.
Difficulty level: ${profile.difficulty}.
Candidate skills: ${profile.skills?.join(", ") || "not specified"}.
Keep your question conversational and natural. Ask ONE clear question only. No preamble, no options — just the question.`;

  const userMessage = isFirst
    ? `Start the ${roundType} round. Ask a suitable opening question.`
    : `Continue the interview. Previous exchanges:\n${previousQA}\n\nAsk the next logical question based on the conversation above.`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 200,
  });

  return response.choices[0].message.content.trim();
};

// Evaluate a candidate's answer and return scores + feedback
const evaluateAnswer = async ({ question, answer, roundType, profile }) => {
  const systemPrompt = `You are a strict but fair interview evaluator. 
Evaluate the following interview answer and return a JSON object only — no explanation outside the JSON.

Return this exact structure:
{
  "scores": {
    "accuracy": <0-10>,
    "confidence": <0-10>,
    "vocabulary": <0-10>,
    "english": <0-10>,
    "overall": <0-10>
  },
  "analysis": ["point 1", "point 2", "point 3"],
  "summary": "one paragraph summary",
  "improvedAnswer": "a better version of the candidate's answer",
  "shouldRetry": <true if overall < 4, else false>
}`;

  const userMessage = `Round: ${roundType}
Role applied for: ${profile.targetRole}
Question: ${question}
Candidate's answer: ${answer}`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 600,
  });

  const raw = response.choices[0].message.content.trim();

  // Parse JSON safely — Groq sometimes wraps it in backticks
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    // If parsing fails, return a fallback so the session doesn't crash
    console.error("Failed to parse AI evaluation JSON:", err.message);
    return {
      scores: {
        accuracy: 5,
        confidence: 5,
        vocabulary: 5,
        english: 5,
        overall: 5,
      },
      analysis: ["Could not fully analyze the response."],
      summary: "Evaluation could not be completed automatically.",
      improvedAnswer: answer,
      shouldRetry: false,
    };
  }
};

// Generate a final interview summary after all rounds are done
const generateFinalSummary = async ({ rounds, profile }) => {
  const roundsSummary = rounds
    .map((r) => {
      const avgScore =
        r.turns.reduce((sum, t) => sum + (t.scores?.overall || 0), 0) /
        (r.turns.length || 1);
      return `${r.roundType} round: average score ${avgScore.toFixed(1)}/10 across ${r.turns.length} questions`;
    })
    .join("\n");

  const systemPrompt = `You are an interview coach. Based on the performance data below, generate a JSON summary.
Return only JSON in this shape:
{
  "overallScore": <0-10 average>,
  "result": {
    "communication": <0-10>,
    "confidence": <0-10>,
    "technical": <0-10>,
    "fluency": <0-10>,
    "vocabulary": <0-10>,
    "grammar": <0-10>,
    "clarity": <0-10>
  },
  "strengths": ["strength 1", "strength 2"],
  "weaknesses": ["weakness 1", "weakness 2"],
  "recommendations": ["tip 1", "tip 2", "tip 3"],
  "finalSummary": "2-3 sentence overall assessment",
  "readinessLabel": "Interview Ready" | "Needs Improvement" | "Promising" | "Keep Practicing"
}`;

  const userMessage = `Candidate for: ${profile.targetRole}
Difficulty: ${profile.difficulty}
Round performance:\n${roundsSummary}`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 700,
  });

  const raw = response.choices[0].message.content.trim();
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse final summary JSON:", err.message);
    return {
      overallScore: 5,
      result: {
        communication: 5,
        confidence: 5,
        technical: 5,
        fluency: 5,
        vocabulary: 5,
        grammar: 5,
        clarity: 5,
      },
      strengths: ["Attempted all rounds"],
      weaknesses: ["Needs more practice"],
      recommendations: [
        "Practice mock interviews regularly",
        "Work on structuring answers",
      ],
      finalSummary:
        "The interview was completed. Keep practicing to improve your performance.",
      readinessLabel: "Keep Practicing",
    };
  }
};

// Evaluate a PPDT response against the reference description
const evaluatePPDT = async ({ userAnswer, referenceDescription, imageId }) => {
  const systemPrompt = `You are an SSB/NDA PPDT evaluator. The candidate described what they saw in an image.
Evaluate their description against the reference and return JSON only:
{
  "overallScore": <0-10>,
  "result": {
    "observation": <0-10>,
    "imagination": <0-10>,
    "communication": <0-10>,
    "confidence": <0-10>,
    "storyStructure": <0-10>,
    "officerLikeQualities": <0-10>
  },
  "recommendations": ["tip 1", "tip 2", "tip 3"]
}`;

  const userMessage = `Reference description: ${referenceDescription}
Candidate's response: ${userAnswer}`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 400,
  });

  const raw = response.choices[0].message.content.trim();
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse PPDT evaluation JSON:", err.message);
    return {
      overallScore: 5,
      result: {
        observation: 5,
        imagination: 5,
        communication: 5,
        confidence: 5,
        storyStructure: 5,
        officerLikeQualities: 5,
      },
      recommendations: [
        "Observe details carefully",
        "Structure your story",
        "Be confident",
      ],
    };
  }
};

export { generateQuestion, evaluateAnswer, generateFinalSummary, evaluatePPDT };
