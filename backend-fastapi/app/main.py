from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import random

# --- MODELS & SCHEMAS ---
class UserProfile(BaseModel):
    name: str = "Guest User"
    email: str = ""
    phone: str = ""
    skills: List[str] = []
    interests: List[str] = []
    selectedCareer: str = "Full Stack Developer"
    aboutInfo: str = ""
    assessmentScore: int = 0

class RoadmapStep(BaseModel):
    id: int
    title: str
    lessons: int
    weeks: int
    progress: int
    status: str
    videoId: str
    description: str

class Application(BaseModel):
    id: int
    company: str
    position: str
    date: str
    status: str

# --- CORE DB (IN-MEMORY FOR MVP) ---
user_db = {
    "current": {
        "profile": UserProfile(),
        "roadmap": [],
        "applications": []
    }
}

app = FastAPI(title="CareerPath AI - Autonomous Career Mentor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CORE SYSTEM MODULES ---

# 1. Profiling Engine
@app.get("/profile")
async def get_profile():
    return user_db["current"]["profile"]

@app.post("/profile")
async def update_profile(profile: UserProfile):
    user_db["current"]["profile"] = profile
    return profile

# 2. Skill Graph Engine
class SkillGraph:
    def __init__(self):
        self.dependencies = {
            "ML": ["Python", "Math"],
            "Python": ["Logic"],
            "React": ["JavaScript", "HTML/CSS"],
            "JavaScript": ["Logic"]
        }
    def get_missing_skills(self, current_skills: List[str], target: str):
        required = self.dependencies.get(target, [])
        return [skill for skill in required if skill not in current_skills]

skill_graph = SkillGraph()

@app.get("/skill-gap/{target}")
async def check_gap(target: str, skills: List[str]):
    return {"gap": skill_graph.get_missing_skills(skills, target)}

# 3. Adaptive Test Engine
@app.post("/generate-test")
async def generate_test():
    return [
        {"q": "What is the Big O complexity of a binary search?", "opts": ["O(n)", "O(log n)", "O(n^2)", "O(1)"], "ans": 1},
        {"q": "Which data structure uses LIFO?", "opts": ["Queue", "Stack", "Linked List", "Tree"], "ans": 1},
        {"q": "What does a React Hook primarily do?", "opts": ["Handle API calls", "Manage state in functional components", "Render CSS", "Compile JS"], "ans": 1}
    ]

# 4. Understanding Verification Engine
@app.post("/verify-understanding")
async def verify_understanding(summary: str, topic: str):
    score = min(max(len(summary) // 5, 20), 95)
    return {
        "score": score,
        "feedback": "Depth of analysis is sufficient." if score > 70 else "Consider providing more technical detail."
    }

# 5. Recommendation Engine
@app.post("/recommend")
async def recommend_careers(skills: List[str], interests: List[str]):
    return [
        {"title": "Full Stack Developer", "match": 95, "desc": "High demand role combining frontend and backend."},
        {"title": "Data Scientist", "match": 88, "desc": "Perfect for your Python and SQL skills."}
    ]

# 6. Roadmap Engine
@app.get("/roadmap")
async def get_roadmap():
    return user_db["current"]["roadmap"]

@app.post("/roadmap")
async def update_roadmap(roadmap: List[RoadmapStep]):
    user_db["current"]["roadmap"] = roadmap
    return roadmap

# 7. Dashboard Engine
@app.get("/dashboard")
async def get_dashboard_summary():
    profile = user_db["current"]["profile"]
    return {
        "skill_score": profile.assessmentScore,
        "active_courses": len([r for r in user_db["current"]["roadmap"] if r.status == "in-progress"]),
        "jobs_applied": len(user_db["current"]["applications"]),
        "leaderboard_rank": random.randint(1, 100)
    }

# 8. Cohort Leaderboard System
@app.get("/leaderboard")
async def get_leaderboard():
    return [
        {"name": "Alice", "rank": 1, "score": 98},
        {"name": "User (You)", "rank": 4, "score": user_db["current"]["profile"].assessmentScore},
        {"name": "Bob", "rank": 12, "score": 72}
    ]

# 9. Mentor Agent System
@app.post("/mentor/check")
async def mentor_agent_task():
    score = user_db["current"]["profile"].assessmentScore
    if score == 0:
        return {"action": "poke", "message": "You haven't started your assessment yet. Take the diagnostic now!"}
    return {"action": "praise", "message": "Great job on your progress!"}

# 10. Call Intervention (Mock)
@app.post("/trigger-call")
async def trigger_intervention_call():
    return {"status": "success", "msg": "Intervention call scheduled via Mock Twilio Service."}

# 11. Applications
@app.get("/applications")
async def get_applications():
    return user_db["current"]["applications"]

@app.post("/applications")
async def update_applications(apps: List[Application]):
    user_db["current"]["applications"] = apps
    return apps

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
