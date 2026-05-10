import { createContext, useContext, useReducer, useCallback } from 'react';

const InterviewContext = createContext(null);

const initialState = {
  role: '',
  difficulty: 'intermediate',
  questions: [],
  sessionId: null,
  answers: [],       // { questionIndex, question, transcript, evaluation }
  currentQ: 0,
  status: 'idle',    // idle | setup | in_progress | completed | evaluating | evaluated
  startTime: null,
  report: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE_CONFIG':
      return { ...state, role: action.role, difficulty: action.difficulty };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.questions };
    case 'SET_SESSION':
      return { ...state, sessionId: action.sessionId, status: 'in_progress', startTime: Date.now() };
    case 'SAVE_ANSWER': {
      const exists = state.answers.findIndex(a => a.questionIndex === action.answer.questionIndex);
      const updated = exists >= 0
        ? state.answers.map((a, i) => i === exists ? { ...a, ...action.answer } : a)
        : [...state.answers, action.answer];
      return { ...state, answers: updated };
    }
    case 'SET_CURRENT_Q':
      return { ...state, currentQ: action.index };
    case 'SET_STATUS':
      return { ...state, status: action.status };
    case 'SET_REPORT':
      return { ...state, report: action.report, status: 'evaluated' };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function InterviewProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setRoleConfig = useCallback((role, difficulty) =>
    dispatch({ type: 'SET_ROLE_CONFIG', role, difficulty }), []);

  const setQuestions = useCallback((questions) =>
    dispatch({ type: 'SET_QUESTIONS', questions }), []);

  const setSession = useCallback((sessionId) =>
    dispatch({ type: 'SET_SESSION', sessionId }), []);

  const saveAnswer = useCallback((answer) =>
    dispatch({ type: 'SAVE_ANSWER', answer }), []);

  const setCurrentQ = useCallback((index) =>
    dispatch({ type: 'SET_CURRENT_Q', index }), []);

  const setStatus = useCallback((status) =>
    dispatch({ type: 'SET_STATUS', status }), []);

  const setReport = useCallback((report) =>
    dispatch({ type: 'SET_REPORT', report }), []);

  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <InterviewContext.Provider value={{
      ...state,
      setRoleConfig, setQuestions, setSession,
      saveAnswer, setCurrentQ, setStatus, setReport, reset,
    }}>
      {children}
    </InterviewContext.Provider>
  );
}

export const useInterview = () => {
  const ctx = useContext(InterviewContext);
  if (!ctx) throw new Error('useInterview must be used inside InterviewProvider');
  return ctx;
};
