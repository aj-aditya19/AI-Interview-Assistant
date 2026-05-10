import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 30000,
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || err.message || 'Something went wrong';
    return Promise.reject(new Error(msg));
  }
);

export const interviewAPI = {
  getRoles: () => API.get('/interview/roles'),
  generateQuestions: (role, difficulty, count = 5) =>
    API.post('/interview/generate-questions', { role, difficulty, count }),
};

export const sessionAPI = {
  create: (role, difficulty, questions) =>
    API.post('/session/create', { role, difficulty, questions }),
  get: (sessionId) => API.get(`/session/${sessionId}`),
  saveAnswer: (sessionId, questionIndex, question, transcript) =>
    API.post(`/session/${sessionId}/answer`, { questionIndex, question, transcript }),
  complete: (sessionId, totalDuration) =>
    API.patch(`/session/${sessionId}/complete`, { totalDuration }),
  listAll: () => API.get('/session/list/all'),
};

export const evaluationAPI = {
  evaluateAnswer: (question, transcript, role, difficulty) =>
    API.post('/evaluation/evaluate-answer', { question, transcript, role, difficulty }),
  evaluateSession: (sessionId) =>
    API.post('/evaluation/evaluate-session', { sessionId }),
};

export const reportAPI = {
  get: (sessionId) => API.get(`/report/${sessionId}`),
};

export default API;
