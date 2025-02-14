from fastapi import FastAPI, HTTPException
from app.compare_syllabi import compare_syllabi
from app.database import comparison_collection, get_syllabus_by_coursecode, syllabus_collection
from bson import ObjectId
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)


# Utility function to convert ObjectId to string
def objectid_to_str(obj):
    if isinstance(obj, ObjectId):
        return str(obj)
    if isinstance(obj, dict):
        return {k: objectid_to_str(v) for k, v in obj.items()}
    if isinstance(obj, list):
        return [objectid_to_str(i) for i in obj]
    return obj

@app.get("/")
def home():
    return {"message": "Syllabus Comparison API is Running!"}


@app.get("/get_syllabus/")
async def get_syllabi():
    syllabi = list(syllabus_collection.find())  
    if not syllabi:
        raise HTTPException(status_code=404, detail="No syllabi found")
    
    syllabi = objectid_to_str(syllabi)
    
    return syllabi

@app.get("/get_syllabus/{year}/{course_code}")
async def get_syllabus(year: str, course_code: str):
    syllabus = syllabus_collection.find_one({"year": year, "course_code": course_code})
    
    if not syllabus:
        raise HTTPException(status_code=404, detail="Syllabus not found")
    
    syllabus = objectid_to_str(syllabus)
    
    return syllabus

@app.post("/compare/")
def compare_syllabus_api(old_syllabus: dict, new_syllabus: dict):
    if not all(field in old_syllabus for field in ["year", "course_code", "program"]) or not all(field in new_syllabus for field in ["year", "course_code", "program"]):
        raise HTTPException(status_code=400, detail="Both syllabi must include 'year', 'course_code', and 'program'.")
    
    result = compare_syllabi(old_syllabus, new_syllabus, similarity_threshold=0.7)
    
    comparison_collection.insert_one({
        "year_1": old_syllabus["year"],
        "course_code_1": old_syllabus["course_code"],
        "program": old_syllabus["program"],  
        "year_2": new_syllabus["year"],
        "course_code_2": new_syllabus["course_code"],
        "comparison_result": result
    })
    
    return result
