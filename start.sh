#!/bin/bash
# Quick dev startup — runs all three services
echo "🚀 Starting InterviewAI..."

# Start Python NLP service in background
echo "🐍 Starting Python NLP service on :8000..."
cd python-service && python main.py &
PYTHON_PID=$!

# Start Node backend
echo "⚡ Starting Node backend on :5000..."
cd ../backend && npm run dev &
NODE_PID=$!

# Start React frontend
echo "⚛️  Starting React frontend on :3000..."
cd ../frontend && npm run dev &
REACT_PID=$!

echo ""
echo "✅ All services started!"
echo "   Frontend:      http://localhost:3000"
echo "   Backend API:   http://localhost:5000"
echo "   Python NLP:    http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop all services."

trap "echo 'Stopping...'; kill $PYTHON_PID $NODE_PID $REACT_PID 2>/dev/null; exit 0" INT
wait
