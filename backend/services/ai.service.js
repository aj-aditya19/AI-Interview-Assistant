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

  const candidateContext = `Target role: ${profile.targetRole} at ${profile.targetCompany || "a top company"}
Skills: ${profile.skills?.join(", ") || "not specified"}
Tech stack: ${profile.techStack?.join(", ") || "not specified"}
Projects: ${profile.projects?.join("; ") || "not specified"}
Experience summary: ${profile.experienceSummary || "not specified"}
Strengths: ${profile.strengths?.join(", ") || "not specified"}
Additional notes: ${profile.additionalMessage || "none"}`;

  const systemPrompt = `You are an experienced ${roundType.toUpperCase()}-round interviewer conducting a live, natural interview. Talk like a real human interviewer, not a quiz generator reading questions off a list.

Candidate profile:
${candidateContext}

Difficulty level: ${profile.difficulty}.

Rules:
- Ask ONE natural, conversational question at a time.
- Ground questions in the candidate's actual skills, tech stack, and projects listed above — refer to their specific projects/technologies by name instead of asking generic textbook questions.
- If there is a previous answer, dig deeper into it first (ask "why", ask for a specific example, challenge an assumption) before jumping to a new topic — a real interviewer follows up before moving on.
- Never repeat a topic already covered in this conversation.
- Output ONLY the question text — no preamble, no labels, no numbering.`;

  const userMessage = isFirst
    ? `Start the ${roundType} round with a warm, natural opening question grounded in the candidate's profile above (e.g. reference one of their actual projects or skills if relevant).`
    : `Continue the interview naturally. Conversation so far:\n${previousQA}\n\nAsk the next question — either a deeper follow-up on their last answer, or a fresh question grounded in their listed skills/projects/tech stack.`;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage },
    ],
    max_tokens: 200,
    temperature: 0.8,
  });

  return response.choices[0].message.content.trim();
};

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

  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned);
  } catch (err) {
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
